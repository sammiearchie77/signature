const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const User = require('../models/user.model');
const Token = require('../models/token.model');
const CustomError = require('../utils/customError');
const config = require("../config/env");
const sendEmail = require('../utils/emailer/sendEmail');

const JWTSecret = config.development.jwtSecret;
const bcryptSalt = config.development.bcryptSalt;
const url = config.development.url;


class AuthService {
    async signup(data) {
        let user = await User.findOne({ email: data.email });
        if (user) throw new CustomError(`Email already exist`);
        user = new User(data);

        const token = JWT.sign({ id: user._id }, JWTSecret);
        await user.save();
        await this.RequestEmailVerification(user.email);
        return (data = {
            uid: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            role: user.role,
            token: token
        });
    }

    async signin(data) {
        if (!data.email) throw new CustomError(`Email is required`);
        if (!data.password) throw new CustomError(`Password is required`);
        console.log(data.password)

        // Check if user exist
        const user = await User.findOne({ email: data.email });
        if (!user) throw new CustomError(`Incorrect email, please scrutinize..`);

        // Check if password is correct
        console.log(user.password)
        const isCorrect = await bcrypt.compare(data.password, user.password);
        if (!isCorrect) throw new CustomError(`Incorrect password, please scrutinize..`);
        const token = await JWT.sign({ id: user._id, role: user.role }, JWTSecret, {
            expiresIn: 60 * 60,
        });

        return (data = {
            uid: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            role: user.role,
            verified: user.isVerified,
            token: token,
        });
    }

    async updatePassword(userId, data) {
        const user = await User.findOne({ id: userId });
        if (!user) throw new CustomError(`User does not exist`);

        // Check if user password is correct
        const isCorrect = await bcrypt.hash(password, Number(bcryptSalt));
        if (!isCorrect) throw new CustomError(`Incorrect password`);

        const hash = await bcrypt.hash(password, Number(bcryptSalt));

        await User.updateOne(
            { _id: userId },
            { $set: { password: hash }},
            { new: true }
        );
    }

    async RequestEmailVerification(email) {
        const user = await User.findOne({ email });
        if (!user) throw new CustomError(`Email does not exist`);
        if (user.isVerified) throw new CustomError(`Email is already verified`);

        let token = await Token.findOne({ userId: user._id });
        if (token) await token.deleteOne();

        let verifyToken = crypto.randomBytes(32).toString('hex');
        const hash = await bcrypt.hash(verifyToken, Number(bcryptSalt));

        await new Token({
            userId: user._id,
            token: hash,
            createdAt: Date.now(),
        }).save();

        const link = `${url.client}/email-verification?uid=${user._id}&verifyToken=${verifyToken}`;

        // Send Email
        await sendEmail(
            user.email,
            'Raveshift: Verify Email',
            {
                name: user.firstname,
                link,
            },
            './template/emailVerify.handlebars'
        );
        return link;
    }

    async VerifyEmail(data) {
        const { userId, verifyToken } = data;

        const user = await User.findOne({ _id: userId });
        if (!user) throw new CustomError(`User does not exist`);
        if (user.isVerified) throw new CustomError(`Email is already verified`);
        
        let Vtoken = await Token.findOne({ userId });
        if (!Vtoken)
            throw new CustomError(`Expired password reset token`);
        const isValid = await bcrypt.compare(verifyToken, Vtoken.token);

        if (!isValid)
            throw new CustomError(`Invalid oassword reset token`)

        await User.updateOne(
            { _id: userId },
            { $set: { isVerified: true }},
            { new: true }
        );

        await Vtoken.deleteOne();
    }

    async RequestPasswordReset(email) {
    const user = await User.findOne({ email });
    if (!user) throw new CustomError("Email does not exist");

    let token = await Token.findOne({ userId: user._id });
    if (token) await token.deleteOne();

    let resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));

    await new Token({
      userId: user._id,
      token: hash,
      createdAt: Date.now(),
    }).save();

    const link = `${url.CLIENT_URL}/reset-password?uid=${user._id}&resetToken=${resetToken}`;

    return link;
  }

  async resetPassword(data) {
    const { userId, resetToken, password } = data;

    let RToken = await Token.findOne({ userId });
    if (!RToken)
      throw new CustomError("Invalid or expired password reset token");

    const isValid = await bcrypt.compare(resetToken, RToken.token);
    if (!isValid)
      throw new CustomError("Invalid or expired password reset token");

    const hash = await bcrypt.hash(password, Number(bcryptSalt));

    await User.updateOne(
      { _id: userId },
      { $set: { password: hash } },
      { new: true }
    );

    await RToken.deleteOne();

    return;
  }
}

module.exports = new AuthService();