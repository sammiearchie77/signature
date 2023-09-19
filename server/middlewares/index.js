const verifyToken = require('./auth.middleware')
const verifySignUp = require('./verification.middleware')

module.exports = {
    verifyToken,
    verifySignUp
};