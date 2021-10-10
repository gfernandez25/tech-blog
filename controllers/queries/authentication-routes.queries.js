const {User} = require("../../models")

const login = function (req) {
    const {username} = req.body;

    return User.findOne({
        where: {
            username
        }
    })
}

const signUp = function (req) {
    const {username, password} = req.body;

    return User.create( {
        username,
        password
    })
}

module.exports = {
    login,
    signUp,

};