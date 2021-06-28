const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    transactionId: String,
    paymentId: String,
    status: {
      type: String,
      enum: ["Initiated", "Processing", "Completed"],
    },
    amount: {
      type: Number,
      required: true,
    },
    discount: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
