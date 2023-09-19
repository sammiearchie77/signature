const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path')

const sendEmail = async (email, subject, payload, template) => {
    try {
        // create a reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            host: '',
            port: 456,
            auth: {
                user: '',
                pass: '',
            },
        });
        const source = fs.readFileSync(path.join(__dirname, template), 'utf-8');
        const compiledTemplate = handlebars.compile(source);
        const options = () => {
            return {
                from: '',
                to: email,
                subject: subject,
                html: compiledTemplate(payload)
            };
        }

        // Send email
        transporter.sendMail(options(), (error, info) => {
            if (error) {
                return error;
            } else {
                return res.status(200).json({
                    success: true,
                });
            }
        });
    } catch (err) {
        console.log(err)
        return err;
    }
};

/*
Example:
sendEmail(
  "mailstoeze@gmail.com",
  "Email subject",
  { name: "Eze" },
  "./templates/layouts/main.handlebars"
);
*/

module.exports = sendEmail;