const { Schema, model } = require("mongoose")

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const organizationSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
      minLength: 3,
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    projects: {
      type: [{ type: Schema.Types.ObjectId, ref: "Project" }],
      default: [],
    },
    users: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
  },
  {
    timestamps: true,
  }
)

const Organization = model("Organization", organizationSchema)

module.exports = Organization
