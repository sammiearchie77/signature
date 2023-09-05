// firebaseAuthMiddleware.js
const admin = require('firebase-admin');

function firebaseAuthMiddleware(req, res, next) {
  const idToken = req.headers.authorization;

  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      req.user = decodedToken;
      next();
    })
    .catch((error) => {
      res.status(401).json({ error: 'Unauthorized' });
    });
}

module.exports = firebaseAuthMiddleware;
