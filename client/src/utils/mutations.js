import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $phone: String
    $password: String!
  ) {
    addUser(
      username: $username
      email: $email
      phone: $phone
      password: $password
    ) {
      token
      user {
        _id
        username
        phone
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        phone
      }
    }
  }
`;

export const MAKE_POST = gql`
  mutation post(
    $make: String!
    $model: String!
    $year: String!
    $carType: String!
    $price: Int!
    $mileage: Int!
    $transmission: String!
    $location: String!
    $description: String!
    $image: String
    $createdAt: String!
  ) {
    post(
      make: $make
      model: $model
      year: $year
      carType: $carType
      price: $price
      mileage: $mileage
      transmission: $transmission
      location: $location
      description: $description
      image: $image
      createdAt: $createdAt
    ) {
      _id
      make
      model
      year
      carType
      location
      price
      mileage
      transmission
      image
      description
      createdAt
      updatedAt
      user {
        _id
        username
        email
        phone
      }
      liked {
        _id
        username
        email
        phone
      }
      likeCount
    }
  }
`;

export const UPDATE_POST = gql`
  mutation updatePost(
    $make: String!
    $model: String!
    $year: String!
    $carType: String!
    $price: Int!
    $mileage: Int!
    $transmission: String!
    $location: String!
    $description: String!
    $image: String
    $updatedAt: String!
  ) {
    updatedPost(
      make: $make
      model: $model
      year: $year
      carType: $carType
      price: $price
      mileage: $mileage
      transmission: $transmission
      location: $location
      description: $description
      image: $image
      updatedAt: $updatedAt
    ) {
      _id
      make
      model
      year
      carType
      location
      price
      mileage
      transmission
      image
      description
      createdAt
      updatedAt
      user {
        _id
        username
        email
        phone
      }
      liked {
        _id
        username
        email
        phone
      }
      likeCount
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId) {
      _id
    }
  }
`;

export const SAVE_TO_FAV = gql`
  mutation savePost($postId: ID!) {
    savePost(postId: $postId) {
      _id
    }
  }
`;
