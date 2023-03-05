const mongoose = require("mongoose");

//user schema

const accountSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    accountType: {
      type: String,
      enum: [
        "Saving",
        "Investment",
        "Credit",
        "Checking",
        "Credit Card",
        "Building",
        "School",
        "Project",
        "Utilities",
        "Travel",
        "Personal",
        "Groceries",
        "Entertainment",
        "Loan",
        "Cash FLow",
        "Universidad",
        "Uncategorized",
      ],
      required: true
    },
    initialBalance: {
      type: Number,
      default: 0,
    },
    transactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction",
      },
    ],
    createBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    notes: {
        type: String,
        required: true,
    }
  },
  {
    timestamps: true,
    toJSON: {virtuals: true}
  }
);

//model
const Account = mongoose.model('Account', accountSchema);

module.exports = Account;