// require('dotenv').config();
// const User = require('../models/userModel');


// // const accountSid = process.env.TWILIO_ACCOUNT_SID;
// // const authToken = process.env.TWILIO_AUTH_TOKEN;
// // const client = require('twilio')(accountSid, authToken);
// // client.messages
// //   .create({
// //      body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
// //      from: '+15017122661',
// //      to: '+15558675310'
// //    })
// //   .then(message => console.log(message.sid));

// // Generate and send OTP
// const sendOTP = async (req, res) => {
//   const { mobileNumber } = req.body;

//   // Generate OTP code
//   const otpCode = Math.floor(100000 + Math.random() * 900000);

//   try {
//     // Save the OTP code to the user document in the database
//     const user = await User.findOneAndUpdate(
//       { mobileNumber },
//       { otpCode },
//       { new: true, upsert: true }
//     );

//     // Send SMS with the OTP code
//     client.messages.create({
//       body: `Your OTP code is ${otpCode}`,
//       from: 9712108463,
//       to: mobileNumber
//     });

//     res.status(200).json({ message: 'OTP sent successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to send OTP' });
//   }
// };

// // Verify OTP
// const verifyOTP = async (req, res) => {
//   const { mobileNumber, otpCode } = req.body;

//   try {
//     // Find the user with the provided mobile number and OTP code
//     const user = await User.findOne({ mobileNumber, otpCode });

//     if (user) {
//       // OTP is verified successfully
//       // Do additional operations here if needed
//       res.status(200).json({ message: 'OTP verified successfully' });
//     } else {
//       res.status(401).json({ message: 'Invalid OTP' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to verify OTP' });
//   }
// };

// module.exports = { sendOTP, verifyOTP };
