const { AuthenticationError } = require("apollo-server-express");
const { User, Post } = require("../models");
const { signToken } = require("../utils/auth");
const mongoose = require("mongoose");

const resolvers = {
  Query: {
    // query when the logged in user wants to see their own dreamlist or postings.
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
          .populate({
            path: "listings",
            populate: { path: "liked" },
            populate: { path: "user" },
          })
          .populate({
            path: "interested",
            populate: { path: "liked" },
            populate: { path: "user" },
          });
      }
      // return User.findOne({ _id: context.user._id })
      //   .populate({
      //     path: "listings",
      //     populate: { path: "liked" },
      //     populate: { path: "user" },
      //   })
      //   .populate({
      //     path: "interested",
      //     populate: { path: "liked" },
      //     populate: { path: "user" },
      //   });
      throw new AuthenticationError("You need to be logged in!");
    },

    getPost: async (parent, { postId }, context) => {
      return await Post.findOne({ _id: postId })
        .populate("user")
        .populate("liked");
    },

    searchResults: async (parent, { make, model }) => {
      return await Post.find({ make: make, model: model })
        .populate("user")
        .populate("liked");
    },
  },

  Mutation: {
    addUser: async (parent, { username, phone, email, password }) => {
      const user = await User.create({ username, phone, email, password });
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No profile with this email found!");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(user);
      return { token, user };
    },

    post: async (
      parent,
      {
        make,
        model,
        year,
        carType,
        price,
        mileage,
        transmission,
        location,
        description,
        image,
        createdAt,
      },
      context
    ) => {
      if (context.user) {
        const newPost = await Post.create({
          make,
          model,
          year,
          carType,
          price,
          mileage,
          transmission,
          location,
          description,
          image,
          createdAt,
          user: context.user._id,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { listings: newPost._id } },
          { new: true, runValidators: true }
        );

        return newPost;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    updatePost: async (
      parent,
      {
        postId,
        make,
        model,
        year,
        carType,
        price,
        mileage,
        transmission,
        location,
        description,
        image,
        updatedAt,
      },
      context
    ) => {
      if (context.user) {
        return await Post.findOneAndUpdate(
          { _id: postId },
          {
            make,
            model,
            year,
            carType,
            price,
            mileage,
            transmission,
            location,
            description,
            image,
            updatedAt,
          },
          { new: true, runValidators: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    deletePost: async (parent, { postId }, context) => {
      if (context.user) {
        const deletedPost = await Post.findOneAndDelete({
          _id: postId,
        });

        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { listings: deletedPost._id } },
          { new: true, runValidators: true }
        );

        return deletedPost;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    savePost: async (parent, { postId }, context) => {
      if (context.user) {
        const post = await Post.findOneAndUpdate(
          { _id: postId },
          { $addToSet: { liked: context.user._id } },
          { new: true, runValidators: true }
        );

        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { interested: postId } },
          { new: true, runValidators: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    removePost: async (parent, { postId }, context) => {
      if (context.user) {
        const post = await Post.findOneAndUpdate(
          { _id: postId },
          { $pull: { liked: context.user._id } },
          { new: true, runValidators: true }
        );
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { interested: postId } },
          { new: true, runValidators: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
