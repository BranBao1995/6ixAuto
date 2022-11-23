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
    transmission: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    mileage: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 400,
      trim: true,
    },
    createdAt: {
      type: Date,
      require: true,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    updatedAt: {
      type: Date,
      get: (timestamp) => dateFormat(timestamp),
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
