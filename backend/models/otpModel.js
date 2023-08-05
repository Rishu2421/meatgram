const { Schema , model } = require("mongoose")


const otpSchema = Schema ({
    number:{
        type:String,
        required : true
      },
      otp:{
        type:String,
        required : true
      },
      createdAt : {type:Date, default: Date.now, index: {expires: 300}}

      // After 5 minutes it delete automatically from the database 
},{ timestamps: true})
module.exports.Otp = model('Otp',otpSchema)

