// firebaseAuthMiddleware.js
import { auth } from 'firebase-admin';

function firebaseAuthMiddleware(req, res, next) {
  const idToken = req.headers.authorization;

  auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      req.user = decodedToken;
      next();
    })
    .catch((error) => {
      res.status(401).json({ error: 'Unauthorized' });
    });
}

export default firebaseAuthMiddleware;
