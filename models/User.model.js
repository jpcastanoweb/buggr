const { Schema, model } = require("mongoose")

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required."],
      unique: [true, "Username is already in use."],
      trim: true,
      minLength: 6,
      maxLength: 20,
      match: [
        /^[a-zA-Z0-9]+$/,
        "Username should contain only alphanumeric characters.",
      ],
    },
    passwordHash: {
      type: String,
      required: [true, "Password is required."],
      trim: true,
      minLength: 8,
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
        "Password needs to have at least 8 characters and must contain at least one number, one lowercase and one uppercase letter.",
      ],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: [true, "Email is already in use."],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
    },
    firstName: {
      type: String,
      required: [true, "First Name is required."],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required."],
    },
    role: {
      type: String,
      default: "",
    },
    organizations: {
      type: [{ type: Schema.Types.ObjectId, ref: "Organization" }],
      default: [],
    },
  },
  {
    timestamps: true,
  }
)

// const passwordErrorMessage = `
//   Your password must contain:
//   - At least 1 lowercase alphabetical character
//   - At least 1 uppercase alphabetical character
//   - At least 1 numeric character
//   - At least one special character, except ?, =, . or *
//   - Your password must be eight characters or longer
// `
const User = model("User", userSchema)

module.exports = User
