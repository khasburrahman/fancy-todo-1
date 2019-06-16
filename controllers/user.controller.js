const { match } = require('../helpers/password.helper')
const jwt = require('../helpers/jwt.helper')
const User = require('../models/user')

class Controller {
    static async login (req, res, next) {
        let { email, password } = req.body
        let errMsg = { code: 400, msg: 'invalid email / pass' }
        try {
            let user = await User.findOne({email}).exec()
            if (user && match(password, user.password)) {
                let token = jwt.sign({user: user._id})
                res.json({access_token: token})
            } else {
                next(errMsg)
            }
        } catch (err) {
            console.log('login error', err)
            next(errMsg)
        }
    }

    static async register (req, res, next) {
        let { email, password } = req.body
        try {
            let user = await User.create({email, password})
            let { _id } = user
            res.json({_id, email, password})
        } catch (err) {
            console.log('register error', err)
            if (err.code === 11000){
                next({code: 400, msg: "email already exists, "+email})
            } else {
                next({code: 400, msg: err.message})
            }
        }
    }
}

module.exports = Controller