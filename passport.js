// const passport = require('passport');
// const localPassportStrategy = require('passport-local').Strategy;

// const User = require('../models/User');


// passport.use(new localPassportStrategy)({
//     usernameFiel: 'email',
//     passwordField: 'password'
// }, async (email, password, done) => {
//     const user = await User.findOne({email})
//     if(!user) {
//         return done(null, false, { message: 'Not user found' });
//     } else {
//        const match = await user.matchPass(password);
//        if (match) {
//            return done(null, user);
//        } else {
//            return done(null, false, { message: 'Incorrect Pass'});
//        }
//     }
// });

// passport.serializeUser((user, done) => {
//     done(null, user.id)
// });

// passport.deserializeUser((id, done))