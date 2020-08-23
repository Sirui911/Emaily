//后端用这种写法
const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
//引入cookieSession是为了get access to cookie
const cookieSession = require('cookie-session');
//引入passport是为了之后要passport交流要携带cookie信息
const passport = require('passport');

require('./models/User');
require('./services/passport');

//connect mongoose and mongo
mongoose.connect(keys.mongoURI);

//采用单app
const app = express();
//第一个require返回一个function，后面紧接着输入argument去调用它 

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
})
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
 
//dynamic port binding
const PORT = process.env.PORT || 5000;
app.listen(PORT);
// http://localhost:5000/

//mongodb+srv://sirui:JCxUMcxY8kh0ODXk@emaily.2dbju.mongodb.net/<emialy_db>?retryWrites=true&w=majority
//mongodb+srv://sirui:<password>@emaily.2dbju.mongodb.net/<dbname>?retryWrites=true&w=majority