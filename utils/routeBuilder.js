const res = require("express/lib/response");

module.exports = function routeBuilder(query) {
    return query.catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
}