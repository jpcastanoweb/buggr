const { Schema, model } = require("mongoose")

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const opportunitySchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required."],
      minLength: 3,
    },
    belongsTo: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: [true, "belongsTo (org) is required."],
    },
    forCustomer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: [true, "forCustomer (customer) is required."],
    },
    openedDate: Date,
    closeDate: Date,
    currentStage: {
      type: String,
    },
    dollarValue: {
      type: Number,
      default: 0,
    },
    posts: {
      type: [{ type: Schema.Types.ObjectId, ref: "Post" }],
      default: [],
    },
    documents: {
      type: [{ type: Schema.Types.ObjectId }],
      default: [],
    },
  },
  {
    timestamps: true,
  }
)

const Opportunity = model("Opportunity", opportunitySchema)

module.exports = Opportunity
