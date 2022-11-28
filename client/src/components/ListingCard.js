import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { Navbar, Nav, Container, Modal, Tab, Button } from "react-bootstrap";
import Auth from "../utils/auth";
import { GET_ME } from "../utils/queries";
import { SAVE_TO_FAV, REMOVE_FROM_FAV } from "../utils/mutations";
import { useNavigate } from "react-router-dom";

const ListingCard = (props) => {
  const navigate = useNavigate();

  const getSavedPostIds = () => {
    const newsavedPostIds = localStorage.getItem("saved_posts")
      ? JSON.parse(localStorage.getItem("saved_posts"))
      : [];

    // console.log(newsavedPostIds);
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
    localStorage.setItem("saved_posts", JSON.stringify(updatedSavedPostIds));
    setSavedPostIds(updatedSavedPostIds);
    return true;
  };
  const { loading, data } = useQuery(GET_ME);
  const [savePost] = useMutation(SAVE_TO_FAV);
  const [removePost] = useMutation(REMOVE_FROM_FAV);
  let userData = data?.me || {};
  const [savedPostIds, setSavedPostIds] = useState(getSavedPostIds());

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
      // upon success, remove post's id from localStorage
      removePostId(postId);
      if (props.onRemove) {
        props.onRemove(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  let button;
  if (!savedPostIds.includes(props.post._id)) {
    button = Auth.loggedIn() && (
      <Button
        disabled={savedPostIds?.some(
          (savedPostId) => savedPostId === props.post._id
        )}
        className="btn-block btn-secondary"
        onClick={() => handleSavePost(props.post._id)}
      >
        Add to DreamList
      </Button>
    );
  } else {
    button = Auth.loggedIn() && (
      <Button
        className="btn-block btn-danger"
        onClick={() => handleDeletePost(props.post._id)}
      >
        Remove from DreamList
      </Button>
    );
  }

  useEffect(() => {
    savePostIds(savedPostIds);
  });

  return (
    <>
      <Container className="row px-0 mx-0 pb-3">
        <div className="col-xs-12 col-sm-5 col-md-5 col-lg-4 px-0">
          <img src={props.post.image} alt={props.post.model} width="100%" />
        </div>
        <div className="col-xs-12 col-sm-7 col-md-7 col-lg-8 px-0">
          <div className="list-card-desc">
            <h6>Make: {props.post.make}</h6>
            <h6>Model: {props.post.model}</h6>
            <h6>Year: {props.post.year}</h6>
            <h6>Location: {props.post.location}</h6>
            <h6>Price: {props.post.price}</h6>
            <div className="d-flex justify-content-between pt-2">
              <Button
                className="btn-block btn-primary"
                onClick={function () {
                  navigate(`/post/${props.post._id}`);
                }}
              >
                View details
              </Button>
              {button}{" "}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ListingCard;

// Use props to get data
