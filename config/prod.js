module.exports = {
    //之所以加google是因为如果再饮用其他的strategy，这两项内容还要放在一个object里
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  //ID,secret, db_name都不加<>
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY
};

//mongodb+srv://myUser:Fjcx0jvhpmQsryUV@cluster0.13u5t.mongodb.net/Emialy-prod?retryWrites=true&w=majority

//google Oauth
//Client ID 499844575134-p8fup03dv1n3kdlcchv19i8hs71gddnq.apps.googleusercontent.com
//Client Secret bXlk65-McyzCZi46md6j6JOs