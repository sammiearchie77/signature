const AuthService = require('../services/auth.service');
const response = require('../utils/response');

class AuthController {
    async signup(req, res) {
        const result = await AuthService.signup(req.body);
        res.status(201).send(response.success(`User successfully created: ${JSON.stringify(result)}`));
    }

    async signin(req, res) {
        const result = await AuthService.signin(req.body);
        res.status(200).send(response.success(`User login successful: ${JSON.stringify(result)}`));
    }

    async updatePassword(req, res) {
        const result = await AuthService.updatePassword(req.params.userId, req.body);
        res.status(200).send(response.success(`Password updated: ${JSON.stringify(result)}`));
    }

    async RequestEmailVerification(req, res) {
        const result = await AuthService.RequestEmailVerification(req.params.email);
        res
            .status(200)
            .send(response.success(`Email verification link sent: ${result}`))
    }

    async VerifyEmail(req, res) {
        const result = await AuthServ.VerifyEmail(req.body);
        res
            .status(200)
            .send(response.success("Email verified successfully", result));
    }

    async RequestPasswordReset(req, res) {
        const result = await AuthServ.RequestPasswordReset(req.query.email);
        res.status(200).send(response.success("Password reset link sent", result));
    }
    async resetPassword(req, res) {
        const result = await AuthServ.resetPassword(req.body);
        res.status(200).send(response.success("Password updated", result));
    }
}

module.exports = new AuthController;