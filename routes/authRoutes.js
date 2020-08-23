const passport = require('passport');

//route handler
module.exports = app =>{
    app.get(
        //当连接以下route时，kick入passport
        '/auth/google',
        //为什么之前未出现google，现在有，是因为google的那个strategy里默认出现google指的就是他
        passport.authenticate('google', {
            //可以用google获得什么信息
            scope: ['profile', 'email']
            //为什么这里不加分号
        })
    );
    
    app.get(
        '/auth/google/callback',
        passport.authenticate('google'));

    app.get('/api/logout', (req,res) => {
        req.logout();
        res.send(req.user);
    });

    app.get(
        '/api/current_user', (req, res) =>{
            res.send(req.user);
            //为什么这里要加
    });
};
