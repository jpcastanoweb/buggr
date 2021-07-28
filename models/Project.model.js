const { Schema, model } = require("mongoose")

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const projectSchema = new Schema(
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
      required: [true, "forCustomer (customer) is required"],
    },
    startDate: Date,
    goalDate: Date,
    wasOpp: Boolean,
    oppOpenedDate: Date,
    oppClosedDate: Date,
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

const Project = model("Project", projectSchema)

module.exports = Project
