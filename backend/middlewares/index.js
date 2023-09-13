const authJwt = require('./auth.middleware')
const verifySignUp = require('./verification.middleware')

module.exports = {
    authJwt,
    verifySignUp
};