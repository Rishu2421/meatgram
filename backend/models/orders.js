const { Schema, model } = require('mongoose');

const orderSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobileNumber: {
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
      required: function () {
        return !this.isCashOnDelivery; // Razorpay details are required only if isCashOnDelivery is false
      },
    },
    razorpay_payment_id: {
      type: String,
      required: function () {
        return !this.isCashOnDelivery; // Razorpay details are required only if isCashOnDelivery is false
      },
    },
    razorpay_signature: {
      type: String,
      required: function () {
        return !this.isCashOnDelivery; // Razorpay details are required only if isCashOnDelivery is false
      },
    },
    isCashOnDelivery: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: 'Not processed',
      enum: ['Not processed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    },
  },
  { timestamps: true }
);

module.exports = model('Order', orderSchema);


// const { Schema, model } = require('mongoose');


  // const orderSchema = new Schema(
  //   {
  //     name: {
  //       type: String,
  //       required: true,
  //     },
  //     mobileNumber: {
  //       type: String,
  //       required: true,
  //     },
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
  //           autopopulate: true, 
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

  // module.exports = model('Order', orderSchema);