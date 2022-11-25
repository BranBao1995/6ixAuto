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
  // const [searchedPosts, setSearchedPosts] = useState([]);
  // const [searchInput, setSearchInput] = useState("");
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
        className="btn-block btn-info"
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
      <Container className="row">
        <div className="col-xs-12 col-sm-5 col-md-5 col-lg-4">
          {/* src=props.post.image */}
          <img
            src="https://hips.hearstapps.com/hmg-prod/images/2023-porsche-911-gt3-rs-201-1660575621.jpg?crop=0.755xw:0.567xh;0.0833xw,0.257xh&resize=1200:*"
            alt={props.post.model}
            width="100%"
          />
        </div>
        <div className="col-xs-12 col-sm-7 col-md-7 col-lg-8">
          <h5>Make: {props.post.make}</h5>
          <h5>Model: {props.post.model}</h5>
          <h5>Year: {props.post.year}</h5>
          <h5>Location: {props.post.location}</h5>
          <h5>Price: {props.post.price}</h5>
          <div className="d-flex justify-content-between">
            {button}{" "}
            <Button
              className="btn-block btn-secondary"
              onClick={function () {
                navigate(`/post/${props.post._id}`);
              }}
            >
              View details
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ListingCard;

// Use props to get data
