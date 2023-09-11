import express from 'express';
import admin from 'firebase-admin';
const router = express.Router();


// Sign in controller
const signin = async (req, res) => {
    const { email, password } = req.body;

   try {
      await admin.auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User successfully signed in
        const user = userCredential.user;
        res.json(user);
      })
   } catch(err) {
        return res.status(401).json({
            error: "Could not sign in"
        })
    }
};

const sendVerification = async (req, res) => {
    const { uid } = req.body;
    
    try {
        // Generate the email verification link
    const emailVerificationLink = await admin.auth().generateEmailVerificationLink(uid);

    // Send the verification email
    await admin.auth().sendEmailVerification(uid, {
      link: emailVerificationLink,
    });

    res.status(200).json({ message: 'Email verification link sent successfully.' });
    } catch(err) {
        console.error('Error sending email verification:', error);
        return res.status(500).json({ error: 'Failed to send email verification.' });
    }
};

const isAuthenticated = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization)
        return res.status(401).send({ message: 'Unauthorized' });
 
    if (!authorization.startsWith('Bearer'))
        return res.status(401).send({ message: 'Unauthorized' });
 
    const split = authorization.split('Bearer ')
    if (split.length !== 2)
        return res.status(401).send({ message: 'Unauthorized' });
 
    const token = split[1]
 
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        console.log("decodedToken", JSON.stringify(decodedToken))
        res.locals = { ...res.locals, uid: decodedToken.uid, role: decodedToken.role, email: decodedToken.email }
        return next();
    }
    catch (err) {
        console.error(`${err.code} -  ${err.message}`)
        return res.status(401).send({ message: 'Unauthorized' });
    }
};
const isAuthorized = async (opts) => {
    const { role, email, uid } = res.locals
       const { id } = req.params

    //    if (email === 'your-root-user-email@domain.com')
    //    return next();

       if (opts.allowSameUser && id && uid === id)
           return next();

       if (!role)
           return res.status(403).send();

       if (opts.hasRole.includes(role))
           return next();

       return res.status(403).send();
};

// signout
const signout = async (req, res) => {
    try {
        await admin.auth().signOut().then(()=> {
            res.status(200).json({
                message: 'User successfully signed out'
            })
        })
    } catch(err){
        return res.status(500).json({
            message: "something went wrong"
        })
    }
};



export default {
    signin,
    signout,
    isAuthenticated,
    isAuthorized
}