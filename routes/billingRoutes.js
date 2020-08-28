const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
    //我们不call，让server internally来call
    app.post('/api/stripe', requireLogin, async (req, res) =>{
        //利用npm.js里面的stripe库来create credit card
        //creating charge object
        const charge = await stripe.charges.create({
            amount:500,
            currency:'usd',
            description: '$5 for 5 credits',
            //付款的authorization的source
            source: req.body.id
        });
        //passport可以自动获取付款的这个user
        req.user.credits += 5;
        const user = await req.user.save();

        res.send(user);
    });
};