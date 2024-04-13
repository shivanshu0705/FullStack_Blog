const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')


function initialize(passport, getUserByUsername, getUserById) {
    const authenticateUser = async (username, password, done) => {
        const user = getUserByUsername(username)
        if (user == null) {
            console.log("No user with that name")
            return done(null, false, { message: 'No user with that username' })
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                console.log(user)
                return done(null, user)
            } else {
                console.log("password incorrect")
                return done(null, false, { message: 'Password incorrect' })
            }
        } catch (error) {
            done(error)
        }
    }
    passport.use(new LocalStrategy({ usernameField: 'username' }, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        return  done(null, getUserById(id))
    })
}

module.exports = initialize