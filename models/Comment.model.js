const { Schema, model } = require("mongoose")

const commentSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
    createdOn: Date,
    author: {
      type: { type: Schema.Types.ObjectId, ref: "User" },
      required: [true, "Author is required"],
    },
    belongsTo: {
      type: { type: Schema.Types.ObjectId, ref: "Post" },
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Post = model("Post", postSchema)

module.exports = Post
