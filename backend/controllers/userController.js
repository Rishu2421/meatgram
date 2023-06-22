require('dotenv').config();
const bcrypt = require('bcrypt');
const _ = require("lodash");

const axios = require("axios");
const otpGenerator = require("otp-generator");

const {User} = require("../models/userModel")
const {Otp} = require("../models/otpModel")

// to activate smsing 
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const verifySid = "VA9c198c689a7ab9c3ad30d180b30448b2";
// const client = require('twilio')(accountSid, authToken);

// client.verify.v2
//   .services(verifySid)
//   .verifications.create({ to: "+919712108463", channel: "sms" })
//   .then((verification) => console.log(verification.status))
//   .then(() => {
//     const readline = require("readline").createInterface({
//       input: process.stdin,
//       output: process.stdout,
//     });
//     readline.question("Please enter the OTP:", (otpCode) => {
//       client.verify.v2
//         .services(verifySid)
//         .verificationChecks.create({ to: "+919712108463", code: otpCode })
//         .then((verification_check) => console.log(verification_check.status))
//         .then(() => readline.close());
//     });
//   });

module.exports.signUp = async (req,res)=>{
    // console.log(req)
        const user = await User.findOne({
            number: req.body.mobileNumber
        });
        if (user) return res.status(400).send("user already registered!");
        const OTP = otpGenerator.generate(6,{
            digits: true,
            alphabets:false,
            upperCase:false,
            specialChars:false
        })
        const number = req.body.mobileNumber;
        console.log(OTP);
       console.log(req.body)
        if (!number) {
            return res.status(400).send("Number is required.");
          }

        const otp = new Otp({number:number,otp:OTP});
        const salt = await bcrypt.genSalt(10);
        otp.otp = await bcrypt.hash(otp.otp,salt);
        const fromPhoneNumber = '+15878045352';
        const result = await otp.save();

        // to activate otp sent on device 
        // client.messages
        // .create({
        //    body: `Your otp to login meatgram is ${OTP}`,
        //    from: fromPhoneNumber,
        //    to: number
        //  })
        // .then(message => console.log(message.sid));
        console.log("Sb hogya backend ka");
        return res.status(200).send("Otp send successfully")
}

module.exports.verifyOtp = async(req,res)=>{
    const otpHolder = await Otp.find({
        number: req.body.mobileNumber
    });
    if (otpHolder.length === 0) return res.status(400).send("You use an expired otp.")

    const rightOtpFind = otpHolder[otpHolder.length-1];
    const validUser = await bcrypt.compare(req.body.otp, rightOtpFind.otp);
    if(rightOtpFind.number === req.body.mobileNumber && validUser){
        const user = new User(_.pick(req.body,["mobileNumber"]))
        if (user.email === null) {
            // Handle null email value (assign a default value or skip saving the user document)
            // For example:
            user.email = "default@gmail.com";
            
          }
        const token = user.generateJWT();
        const result = await user.save();

        const OTPDelete = await Otp.deleteMany({
            number:rightOtpFind.mobileNumber
        });
        return res.status(200).send({
            message:"User registration successfull",
            token : token,
            data:result
        });
    } else {
        return res.status(400).send("Your otp is wrong")
    }

}