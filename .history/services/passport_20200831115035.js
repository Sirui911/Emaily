 //引入passport
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
//..means go up one folder
const keys = require('../config/keys');

const User = mongoose.model('users');
 
 //https://console.cloud.google.com/

passport.serializeUser((user, done) => {
    //null是error message，为什么不用google.id是因为会有很多provider
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id). then(user => {
        done(null, user);
    });
});

passport.use(  
    new GoogleStrategy(
        {
        //D必须要大写
        clientID:keys.googleClientID,
        clientSecret:keys.googleClientSecret,
        callbackURL:'/auth/google/callback',
        proxy: true
        }, 
    //arrow function
    async (accessToken, refreshToken, profile, done) =>  {
        const existingUser = await User.findOne({googleId: profile.id});

            if (existingUser){
                //we already have a record with given id
                return done(null, existingUser);
            }
            //we don't have a user with this id, make a new user id
            //前面半句只是见了一个js instance，和db无关，只有save了才存进去db
            // console.log('profile', profile);
            const user = await new User({googleId: profile.id}).save();
            //user指的是我们刚刚见的instance
            done(null, user);
            }        
    )
);

