// User.js

const { Schema,model} = require('mongoose');

const jwt= require('jsonwebtoken')

const userSchema = new Schema({
  name: {
    type: String,
  },
  mobileNumber:{
    type:String,
    required : true,
    unique: true,
  },
  emailId: {
    type: String,
  },
},{timestamps: true});

userSchema.methods.generateJWT  = function(){
          const token = jwt.sign({
            _id:this._id,
            mobileNumber:this.mobileNumber
          },process.env.JWT_SECRET_KEY,{ expiresIn : "7d" }); 
          return token;
}


module.exports.User = model('User', userSchema);
