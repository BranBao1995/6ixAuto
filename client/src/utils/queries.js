import { gql } from "@apollo/client";

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      phone
      listings {
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
          phone
        }
        liked {
          _id
          username
          phone
        }
        likeCount
      }
      interested {
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
          phone
        }
        liked {
          _id
          username
          phone
        }
        likeCount
      }
    }
  }
`;

export const GET_POST = gql`
  query getPost($postId: ID!) {
    getPost(postId: $postId) {
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

export const GET_SEARCH = gql`
  query searchResults {
    searchResults {
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
