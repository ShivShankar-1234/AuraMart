const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        itemTotal: {
          type: Number,
          required: true,
        },
      },
    ],
    subtotal: {
      type: Number,
      required: true,
    },
    deliveryFee: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending_approval", "placed", "accepted", "prepared", "dispatched", "delivered"],
      default: "pending_approval",
    },
    deliveryBoy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    shippingAddress: {
      type: String,
      required: true,
    },
    estimatedTime: {
      type: Date,
      required: true,
    },
    customerLatLng: {
      type: [Number],
      default: [12.9700, 77.6100]
    },
    storeLatLng: {
      type: [Number],
      default: [12.9800, 77.5900]
    },
    paymentMethod: {
      type: String,
      default: "Credit Card"
    },
    upiId: {
      type: String,
      default: ""
    },
    paymentStatus: {
      type: String,
      default: "Paid"
    },
    deliveryProof: {
      type: String,
      default: null
    },
    customerPhone: {
      type: String,
      default: ""
    },
    deliveryInstructions: {
      type: String,
      default: ""
    },
    deliveryAddress: {
      fullName: { type: String, default: "" },
      mobile: { type: String, default: "" },
      house: { type: String, default: "" },
      area: { type: String, default: "" },
      landmark: { type: String, default: "" },
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      pincode: { type: String, default: "" },
      address: { type: String, default: "" },
      latitude: { type: Number, default: 12.9700 },
      longitude: { type: Number, default: 77.6100 }
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
