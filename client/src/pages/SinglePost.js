import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { GET_POST, GET_ME } from "../utils/queries";

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
    const newsavedPostIds = localStorage.getItem("saved_posts")
      ? JSON.parse(localStorage.getItem("saved_posts"))
      : [];

    return newsavedPostIds;
  };
  const savePostIds = (postIdArr) => {
    if (postIdArr.length) {
      localStorage.setItem("saved_posts", JSON.stringify(postIdArr));
    } else {
      localStorage.removeItem("saved_posts");
    }
  };
  const removePostId = (postId) => {
    const newsavedPostIds = localStorage.getItem("saved_posts")
      ? JSON.parse(localStorage.getItem("saved_posts"))
      : null;

    if (!newsavedPostIds) {
      return false;
    }

    const updatedSavedPostIds = newsavedPostIds?.filter(
      (savedId) => savedId !== postId
    );
    console.log(updatedSavedPostIds);
    localStorage.setItem("saved_posts", JSON.stringify(updatedSavedPostIds));
    setSavedPostIds(updatedSavedPostIds);
    return true;
  };

  const { dataa } = useQuery(GET_ME);
  const [savedPostIds, setSavedPostIds] = useState(getSavedPostIds());

  const [savePost] = useMutation(SAVE_TO_FAV);
  const [removePost] = useMutation(REMOVE_FROM_FAV);
  let userData = dataa?.me || {};
  console.log(userData);

  const handleSavePost = async (postId) => {
    try {
      const { userData } = await savePost({
        variables: { postId: postId },
      });
      // if post successfully saves to user's account, save post id to state
      setSavedPostIds([...savedPostIds, postId]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const { data } = await removePost({ variables: { postId } });
      userData = data.removePost;
      console.log(data);
      // upon success, remove post's id from localStorage
      removePostId(postId);
    } catch (err) {
      console.error(err);
    }
  };

  let button;
  if (!savedPostIds.includes(postId)) {
    button = Auth.loggedIn() && (
      <Button
        disabled={savedPostIds?.some((savedPostId) => savedPostId === postId)}
        className="btn-block btn-info"
        onClick={() => handleSavePost(postId)}
      >
        Add to DreamList
      </Button>
    );
  } else {
    button = Auth.loggedIn() && (
      <Button
        className="btn-block btn-danger"
        onClick={() => handleDeletePost(data.getPost._id)}
      >
        Remove from DreamList
      </Button>
    );
  }

  useEffect(() => {
    console.log(savedPostIds);
    savePostIds(savedPostIds);
  });

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
            {button}
          </div>
        </div>
      ) : (
        <div> Loading... </div>
      )}
    </>
  );
};

export default SinglePost;
