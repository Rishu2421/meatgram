const { Schema, model } = require('mongoose');


const orderSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        item: {
          type: Schema.Types.ObjectId,
          ref: 'Item',
          autopopulate: true, 
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    razorpay_order_id: {
      type: String,
      required: true,
    },
    razorpay_payment_id: {
      type: String,
      required: true,
    },
    razorpay_signature: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Not processed",
      enum: ["Not processed", "Processing", "Shipped", "Delivered", "Cancelled"],
    },
  },
  { timestamps: true }
);

module.exports = model('Order', orderSchema);




// const orderSchema = new Schema(
//   {

//     userId: {
//       type: Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//     items: [
//       {
//         item: {
//           type: Schema.Types.ObjectId,
//           ref: 'Item',
//         },
//         quantity: {
//           type: Number,
//           default: 1,
//         },
//       },
//     ],
//     amount: {
//       type: Number,
//       required: true,
//     },
//     address: {
//       type: String,
//       required: true,
//     },
//     razorpay_order_id: {
//       type: String,
//       required: true,
//     },
//     razorpay_payment_id: {
//       type: String,
//       required: true,
//     },
//     razorpay_signature: {
//       type: String,
//       required: true,
//     },
//     status: {
//       type: String,
//       default: "Not processed",
//       enum: ["Not processed", "Processing", "Shipped", "Delivered", "Cancelled"],
//     },
//   },
//   { timestamps: true }
// );



// const mongoose = require("mongoose");
// const { ObjectId } = mongoose.Schema.Types;

// const orderSchema = new mongoose.Schema({


// razorpay_order_id: {
//   type:String ,
//   required: true
// },
// razorpay_payment_id: {
//   type:String ,
//   required: true
// },
// razorpay_signature: {
//   type:String ,
//   required: true
// },

// },{ timestamps: true })


// // const mongoose = require("mongoose");
// // const { ObjectId } = mongoose.Schema.Types;

// // const orderSchema = new mongoose.Schema(
// //   {
//     // allProduct: [
// //       {
// //         id: { type: ObjectId, ref: "Item" },
// //         quantitiy: Number,
// //       },
// //     ],
// //     user: {
// //       type: ObjectId,
// //       ref: "User",
// //       required: true,
// //     },
// //     amount: {
// //       type: Number,
// //       required: true,
// //     },
// //     address: {
// //       type: String,
// //       required: true,
// //     },
//     // razorpay_order_id: {
//     //   type:String ,
//     //   required: true
//     // },
//     // razorpay_payment_id: {
//     //   type:String ,
//     //   required: true
//     // },
//     // razorpay_signature: {
//     //   type:String ,
//     //   required: true
//     // },
// //     status: {
// //       type: String,
// //       default: "Not processed",
// //       enum: [
// //         "Not processed",
// //         "Processing",
// //         "Shipped",
// //         "Delivered",
// //         "Cancelled",
// //       ],
// //     },
// //   },
// //   { timestamps: true }
// // );

// const orderModel = mongoose.model("orders", orderSchema);
// module.exports = orderModel;





// Order.js

