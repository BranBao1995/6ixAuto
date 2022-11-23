const { AuthenticationError } = require("apollo-server-express");
const { User, Post } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // query when the logged in user wants to see their own dreamlist or postings.
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
          .populate("listings")
          .populate("interested");
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    searchResults: async (parent, { make, model }) => {
      return Post.find({ make: make, model: model }).populate("user");
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
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
          { $addToSet: { listings: newPost._id } }
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
        await Post.findOneAndUpdate(
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
          }
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
          { $pull: { listings: deletedPost._id } }
        );

        return deletedPost;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    savePost: async (parent, { postId }, context) => {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { interested: postId } }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    removePost: async (parent, { postId }, context) => {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { interested: postId } }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
