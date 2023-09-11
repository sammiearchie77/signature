import express from 'express';
import authControlller from '../controllers/auth.controller'

const router = express.Router();

router.route('/auth/sign-in')
  .post(authControlller.signin)

router.route('/auth/sign-out')
    .get(authControlller.signout)


export default router;