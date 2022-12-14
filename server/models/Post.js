const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const postSchema = new Schema(
  {
    make: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    carType: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    mileage: {
      type: Number,
      required: true,
    },
    transmission: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 400,
      trim: true,
    },
    createdAt: {
      type: String,
      required: true,
      // default: Date.now,
      // get: (timestamp) => dateFormat(timestamp),
    },
    updatedAt: {
      type: String,
      // get: (timestamp) => dateFormat(timestamp),
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    liked: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

postSchema.virtual("likeCount").get(function () {
  return this.liked.length;
});

const Post = model("Post", postSchema);

module.exports = Post;
