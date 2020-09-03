const _ = require('lodash');
const { Path } = require('path-parser');
//自带库，无需引入
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer =  require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const { RSA_NO_PADDING } = require('constants');


const Survey = mongoose.model('surveys');


module.exports = app => {
//     app.get('/api/surveys/thanks', (req,res)=> {
//         res.send("Thanks for voting!");
//     });
    app.get('/api/surveys', requireLogin, async (req,res) =>{
        const surveys = await Survey.find({_user: req.user.id}).select({
            //不显示其中的recipients这个属性
            recipients:false
        });
        res.send(surveys);
    });

    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thanks for voting!');
    });

    app.post('/api/surveys/webhooks', (req,res)=> {
        const p = new Path('/api/surveys/:surveyId/:choice');
        //use lodash chain helper
        _.chain(req.body)
            .map(({email, url}) => {
                const match = p.test(new URL(url).pathname);
                if(match){
                    return{ email, surveyId: match.surveyId, choice: match.choice};
                }
            })
            .compact()
            //remove event with same eamil&surveyId
            .uniqBy('email', 'surveyId')
            .each(({surveyId, email, choice}) => {
                //找到这个并update，直接在mongoose进行的操作
                Survey.updateOne({
                    _id: surveyId,
                    //找到一个recipient，其中的element符合一下标准
                    recipients: {
                        $elemMatch: { email: email, responded: false }
                      }    
                }, {
                    //一个smart operation在mongoose中，第一个是increment，choice不管是yes还是no在该加的那个➕1，recipient的responded改为true
                    $inc: {[choice]: 1},
                    $set: {'recipients.$.responded': true},
                    $lastResponded: new Date()
                    //上述操作要加exec才能执行
                }).exec();
            })
            .value();

        // console.log(events);
        //因为sendgrid只负责提供给我们消息，所以不在乎res什么，直接res空即可
        res.send({});
    });

    app.post('/api/surveys', requireLogin, requireCredits, async (req,res) =>{
        const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    // Great place to send an email!
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try{
        await mailer.send();
        await survey.save();
        req.user.credits -= 1;
        const user = await req.user.save();
        //最后一步是为了在header这里显示出updated的credits
        res.send(user);
    }catch(err){
        //422 的意思是的data you send to us is wrong
        res.status(422).send(err);
    }
        
    });
};

