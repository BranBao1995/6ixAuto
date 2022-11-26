import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $phone: String!
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
      username
      email
      phone
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
  ) {
    updatePost(
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
    ) {
      _id
      username
      email
      phone
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
      username
      phone
    }
  }
`;

export const REMOVE_FROM_FAV = gql`
  mutation removePost($postId: ID!) {
    removePost(postId: $postId) {
      _id
      username
      phone
    }
  }
`;
