const jwt = require('jsonwebtoken');

const generateToken = id => {
    return jwt.sign({id}, "anykey", {expiresIn: "12h"})
}

module.exports = generateToken