const admin = require('firebase-admin');

const serviceAccount = require('../../signature-db486-firebase-adminsdk-7t93r-4cbb89bc8b.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})

module.exports = admin;