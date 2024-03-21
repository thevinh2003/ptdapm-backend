import dotenv from "dotenv"
dotenv.config()
import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import { Strategy as FacebookStrategy } from "passport-facebook"

const config = () => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `/api/${process.env.API_VERSION}/auth/google/callback`,
    }, 
    async function (accessToken, refreshToken, profile, cb) {
        try {
            return cb(null, profile)
        } catch (e) {
            console.log(e)
        }
    }));

    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: `/api/${process.env.API_VERSION}/auth/facebook/callback`,
        profileFields: ['emails', 'photos', 'displayName', 'id']
    },
    async function(accessToken, refreshToken, profile, cb) {
        try {
            return cb(null, profile)
        } catch (e) {
            console.log(e)
        }
    }));
}

export default config
