const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
    title: String,
    body: String,
    subject:String,
    recipients:[RecipientSchema],
    yes: { type: Number, default: 0},
    no: { type: Number, default: 0},
    //_是relationship field的意思，every survey belongs to a user schema，ID指的是user的id
    _user: { type: Schema.Types.ObjectId, ref:'User'},
    //optional, lastresponded是最后一个填survey的时间，可以看出大概survey完成了多少
    dateSent: Date,
    lastResponded: Date
});

mongoose.model('surveys', surveySchema);