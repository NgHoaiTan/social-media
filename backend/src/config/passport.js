const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const authService = require('../services/authService');
const User = require('../models/User')

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/api/v1/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const userData = {
                    googleId: profile.id,
                    username: profile.displayName,
                    email: profile.emails[0].value,
                    profilePicture: profile.photos[0].value
                };
                const result = await authService.googleLogin(userData);
                done(null, result);
            } catch (error) {
                console.error('Error in Google Strategy:', error); // Log lỗi
                done(error, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;