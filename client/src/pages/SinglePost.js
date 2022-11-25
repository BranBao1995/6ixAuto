import React from "react";

import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";

import { GET_POST } from "../utils/queries";

import { SAVE_TO_FAV, REMOVE_FROM_FAV } from "../utils/mutations";
// import {  } from "../utils/mutations";

const SinglePost = () => {
  const { postId } = useParams();

  const { loading, data } = useQuery(GET_POST, {
    variables: { postId: postId },
  });
  console.log(data);
  const post = data?.post || {};
  console.log(post);

  const getSavedPostIds = () => {
    const savedPostIds = localStorage.getItem("saved_posts")
      ? JSON.parse(localStorage.getItem("saved_posts"))
      : [];

    return savedPostIds;
  };
  const savePostIds = (postIdArr) => {
    if (postIdArr.length) {
      localStorage.setItem("saved_posts", JSON.stringify(postIdArr));
    } else {
      localStorage.removeItem("saved_posts");
    }
  };
  const removePostId = (postId) => {
    const savedPostIds = localStorage.getItem("saved_posts")
      ? JSON.parse(localStorage.getItem("saved_posts"))
      : null;

    if (!savedPostIds) {
      return false;
    }

    const updatedSavedPostIds = savedPostIds?.filter(
      (savedPostId) => savedPostId !== postId
    );
    localStorage.setItem("saved_posts", JSON.stringify(updatedSavedPostIds));

    return true;
  };

  return (
    <>
      {data ? (
        <div className="mt-3">
          <div className="col-xs-12 col-sm-5 col-md-5 col-lg-4">
            {/* src=props.image */}
            <img
              src="https://hips.hearstapps.com/hmg-prod/images/2023-porsche-911-gt3-rs-201-1660575621.jpg?crop=0.755xw:0.567xh;0.0833xw,0.257xh&resize=1200:*"
              alt={post.model}
              width="100%"
            />
          </div>
          <div className="col-xs-12 col-sm-7 col-md-7 col-lg-8">
            <p>Make: {data.getPost.make}</p>
            <p>Model: {data.getPost.model}</p>
            <p>Year: {data.getPost.year}</p>
            <p>Type: {data.getPost.carType}</p>
            <p>Location: {data.getPost.location}</p>
            <p>Mileage: {data.getPost.mileage}</p>
            <p>Transmission: {data.getPost.transmission}</p>
            <p>Description: {data.getPost.description}</p>
            <p>Created: {data.getPost.createdAt}</p>
            <p>Price: {data.getPost.price}</p>
            <p>Likes: {data.getPost.liked.length}</p>
            {/* {button} */}
            <button>placeholder</button>
          </div>
        </div>
      ) : (
        <div> Loading... </div>
      )}
    </>
  );
};

export default SinglePost;
