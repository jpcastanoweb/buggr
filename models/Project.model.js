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
    },
    startDate: Date,
    goalDate: Date,
    currentStage: {
      type: String,
    },
    dollarValue: {
      type: Number,
      default: 0,
    },
    contactFullName: {
      type: String,
      default: "",
      required: [true, "Please insert the project's contact's full name."],
    },
    contactPhoneNumber: {
      type: String,
      default: "",
      required: [true, "Please insert the project's contact's phone number."],
    },
    contactEmailAddress: {
      type: String,
      required: [true, "Please insert the project's contact's email address."],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
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
