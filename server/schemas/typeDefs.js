const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    phone: String!
    email: String!
    password: String!
    listings: [Post]
    interested: [Post]
  }

  type Post {
    _id: ID!
    make: String!
    model: String!
    year: String!
    carType: String!
    location: String!
    price: Int!
    mileage: Int!
    transmission: String!
    image: String
    description: String!
    createdAt: String!
    updatedAt: String
    user: User!
    liked: [User]
    likeCount: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    mee: User
    getPost(postId: ID!): Post
    searchResults(make: String!, model: String!): [Post]
  }

  type Mutation {
    addUser(
      username: String!
      email: String!
      password: String!
      phone: String!
    ): Auth
    post(
      make: String!
      model: String!
      year: String!
      carType: String!
      location: String!
      price: Int!
      mileage: Int!
      transmission: String!
      image: String
      description: String!
      createdAt: String!
    ): Post
    login(email: String!, password: String!): Auth
    updatePost(
      postId: ID!
      make: String!
      model: String!
      year: String!
      carType: String!
      location: String!
      price: Int!
      mileage: Int!
      transmission: String!
      image: String
      description: String!
      updatedAt: String!
    ): Post
    deletePost(postId: ID!): Post
    savePost(postId: ID!): User
    removePost(postId: ID!): User
  }
`;

// deletePost deletes the entire post. removePost removes post from DreamList.

module.exports = typeDefs;
