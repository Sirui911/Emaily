//后端用这种写法
const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
//引入cookieSession是为了get access to cookie
const cookieSession = require('cookie-session');
//引入passport是为了之后要passport交流要携带cookie信息
const passport = require('passport');
//为了获取req中的信息，可以用req.xxx将req parse成object
const bodyParser = require('body-parser');

require('./models/User');
require('./services/passport');

//connect mongoose and mongo
mongoose.connect(keys.mongoURI);

//采用单app
const app = express();
//第一个require返回一个function，后面紧接着输入argument去调用它 

app.use(bodyParser.json());
app.use(
    cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [keys.cookieKey]
    })
  );
app.use(passport.initialize());
app.use(passport.session());

//以下代码只在production的时候运行
if (process.env.NODE_ENV === 'production'){
  //express will server up production assets, like our main.js or main.css
  //虽然express不能处理，但是可以找到具体文件
  app.use(express.static('client/build'));

  //express will server up the index.html file if it doesn't recognize the file
  //对应无法处理，所以返回index.html
  const path = require('path');
  app.get('*', (req, res) =>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
 
//dynamic port binding
const PORT = process.env.PORT || 5000;
app.listen(PORT);
// http://localhost:5000/

//mongodb+srv://sirui:JCxUMcxY8kh0ODXk@emaily.2dbju.mongodb.net/<emialy_db>?retryWrites=true&w=majority
//mongodb+srv://sirui:<password>@emaily.2dbju.mongodb.net/<dbname>?retryWrites=true&w=majority