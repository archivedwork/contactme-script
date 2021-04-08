const express = require('express');
const router = express.Router();
const cors = require('cors');
const nodemailer = require('nodemailer');


const app = express();
app.use(cors());
app.use(express.json());
app.use('/', router);

app.listen(5000, () => console.log('Server Running'));


const contactEmail = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        type: "login",
        secure: true,
        user: "youremail@gmail.com",
        pass: "yourgeneratedgooglepassword", // if your gmail have 2-step auth ->  get it from google -> Account -> security -> Signing in to Google tab -> App passwords -> generate
    },
});


contactEmail.verify((err) => {
    if(err) {
        console.log(err);
    } else {
        console.log("Ready to send");
    }
});

router.post("/contact", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;
    const mail = {
        from: name,
        to: "youremail@gmail.com",
        subject: "Contact Form Message",
        html: `<p>Name: ${name}</p>
               <p>Email: ${email}</p>
               <p>Message: ${message}</p>
`
    };
    contactEmail.sendMail(mail, (error) => {
        if (error) {
            res.json({ status: "failed" });
        } else {
            res.json({ status: "sent" });
        }
    });
});
