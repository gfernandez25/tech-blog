const {User} = require("../../models")
const routeBuilder = require("../../utils/routeBuilder");

const login = function (req) {
    const {username} = req.body;

    return routeBuilder(User.findOne({
        where: {
            username
        }
    }))
}

const signUp = function (req) {
    const {username, password} = req.body;

    return routeBuilder(User.create( {
        username,
        password
    }))
}

module.exports = {
    login,
    signUp,

};