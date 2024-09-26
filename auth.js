// sets up passport with a local authentication strategy using a person model

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
// the passport local Strategy is a part of the passport.js authentication middleware for nodejs
// It is specially designed for handling username and passport based authentication
const Person = require("./models/person");

passport.use(
  new LocalStrategy(async (USERNAME, password, done) => {
    // authentication logic here
    try {
    //   console.log("received credential", USERNAME, password);
      const user = await Person.findOne({ username: USERNAME });
      if (!user) return done(null, false, { message: "Incorect username" });

      const isPasswordMatch =await user.comparePassword(password);
      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect password" });
      }
    } catch (err) {
      return done(err);
    }
  })
);

module.exports = passport; //Export configured passport


// you can use the bcrypt library for password hashing in our node js application