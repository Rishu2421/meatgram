// User.js

const { Schema,model} = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const jwt= require('jsonwebtoken');
const findOrCreate = require('mongoose-findorcreate')



const userSchema = new Schema({
  name: {
    type: String,
  },
  mobile:{
    type:Number,
    required:false,
    unique:false
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  cartItems: [
    {
      item: {
        type: Schema.Types.ObjectId,
        ref: 'Item',
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Order',
    },
  ],
},{timestamps: true});


userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(findOrCreate);

userSchema.methods.generateJWT  = function(){
          const token = jwt.sign({
            _id:this._id,
            email:this.email
          },process.env.JWT_SECRET_KEY,{ expiresIn : "7d" }); 

          return token;
};

module.exports.User = model('User', userSchema);
