var express = require('express');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var User = require('../models/user');
var router = express.Router();

passport.use(new FacebookStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
}, function (accessToken, refreshToken, profile, done) {
    User.findOne({ socialId: profile.id }, function (err, user) {
        if (err) return done(err);
        if (!user) {
            done(null, user);
        }
        var newUser = new User({ username: profile.displayName, socialId: profile.id });
        newUser.save(function (err, user) {
            if (err) return done(err);
            done(null, user);
        });
    });
}));

module.exports = {
    authFacebook: passport.authenticate('facebook'),
    authFacebookCallback: passport.authenticate('facebook', {
        successRedirect: '/', failureRedirect: '/login'
    })
};