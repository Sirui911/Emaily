const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
//和上面那句完全一样，下面这句的意思是在mongoose中找到Schema这个property，然后赋给Schema
const { Schema } = mongoose;

//虽然mongodb中可以有不同的properties，但是mongoose必须先写出所有的properties
const userSchema = new Schema ({
    googleId: String
});

//第一个参数是collection的名字，第二个是schema的名字
//load schema into mongoose
mongoose.model('users', userSchema);