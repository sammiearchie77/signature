const User = require('../models/user.model');


const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    const { firstname, lastname, email } = req.body;
    // Username
    User.find({
        firstname: firstname,
        lastname: lastname
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (user) {
            console.log(user)
            res.status(400).send({ message: "Failed! Username is already in use!" });
            return;
        }

        // Email
        User.findOne({
            email: email
        }).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (user) {
                res.status(400).send({ message: "Failed! Email is already in use!" });
                return;
            }

            next();
        });
    });
};



const verifySignUp = checkDuplicateUsernameOrEmail;

module.exports = verifySignUp;