// Server properties
require('dotenv').config();
import app from './express';
import devBundle from './devBundle';
import admin from 'firebase-admin';
const serviceAccount = require('./signature-db486-firebase-adminsdk-7t93r-4cbb89bc8b.json')
import template from './template'
// import connectToMongoDB from './server/config/config';

// remove this line before compiling
devBundle.compile(app)


app.get('/', (req, res) => {
  res.status(200).send(template())
})

// database config
// connectToMongoDB();

// firebase init

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

