import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { GET_POST } from "../utils/queries";
import { SAVE_TO_FAV, REMOVE_FROM_FAV } from "../utils/mutations";
import { useNavigate } from "react-router-dom";

const SinglePost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const { loading, data } = useQuery(GET_POST, {
    variables: { postId: postId },
  });
  const post = data?.getPost || {};
  // console.log(post);

  const [savePost] = useMutation(SAVE_TO_FAV);
  const [removePost] = useMutation(REMOVE_FROM_FAV);

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

  const [savedPostIds, setSavedPostIds] = useState(getSavedPostIds());
  // const { dataa } = useQuery(GET_ME);
  // let userData = dataa?.me || {};
  // console.log(userData);

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
      // userData = data.removePost;
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

  // console.log(typeof Auth.getProfile().data._id);
  // console.log(data.getPost.user._id);

  // let editButton;
  // if (data.getPost.user._id === Auth.getProfile().data._id) {
  //   editButton = (
  //     <Button
  //       onClick={() => {
  //         navigate(`/edit/${data.getPost.user._id}`);
  //       }}
  //     >
  //       Edit
  //     </Button>
  //   );
  // }

  useEffect(() => {
    savePostIds(savedPostIds);
  });

  return (
    <>
      {data ? (
        <div className="mt-3">
          {data.getPost.user._id == Auth.getProfile().data._id ? (
            <Button
              onClick={() => {
                navigate(`/edit/${postId}`);
              }}
            >
              Edit
            </Button>
          ) : (
            ""
          )}
          <div className="col-xs-12 col-sm-5 col-md-5 col-lg-4">
            {/* src=props.image */}
            <img
              src={data.getPost.image}
              alt={data.getPost.model}
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

            <p>Price: {data.getPost.price}</p>
            <p>Likes: {data.getPost.liked.length}</p>
            <p>Posted by: {data.getPost.user.username}</p>
            <p>Contact email: {data.getPost.user.email}</p>
            <p>Contact phone: {data.getPost.user.phone}</p>
            <p>Created: {data.getPost.createdAt}</p>
            <p>Last update: {data.getPost.updatedAt}</p>
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
