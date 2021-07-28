const { Schema, model } = require("mongoose")

const customerSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Customer name is required."],
    },
    belongsTo: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: [true, "belongsTo (org) is required."],
    },
    contactInfo: {
      firstName: String,
      lastName: String,
      emailAddress: String,
      phoneNumber: String,
    },
    projects: {
      type: [{ type: Schema.Types.ObjectId, ref: "Project" }],
      default: [],
    },
    opportunities: {
      type: [{ type: Schema.Types.ObjectId, ref: "Opportunity" }],
      default: [],
    },
    customerAddress: {
      street1: String,
      street2: String,
      city: String,
      state: String,
      country: String,
    },
    customerPhoneNumber: String,
    customerEmailAddress: String,
  },
  {
    timestamps: true,
  }
)

const Customer = model("Customer", customerSchema)

module.exports = Customer
