require('dotenv').config();

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: "signature-db486.firebaseapp.com",
    projectId: "signature-db486",
    storageBucket: "signature-db486.appspot.com",
    messagingSenderId: "64542511201",
    appId: "1:64542511201:web:0c181e223e3910d895da20",
    measurementId: "G-F69KH8274F"
}


module.exports = firebaseConfig;
