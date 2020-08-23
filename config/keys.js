//figure out what set of credential to return
//process是啥，如果我们heroku，下面这个变量会变自动成为production
if (process.env.NODE_ENV === 'production'){
  //we are in production, return the prod set of keys
  module.exports = require('./prod');
}else{
  //we are in dev, return the dev keys
  module.exports = require('./dev');
}

