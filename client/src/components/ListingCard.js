import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { Navbar, Nav, Container, Modal, Tab, Button } from "react-bootstrap";
import Auth from "../utils/auth";
import { GET_ME } from "../utils/queries";
import { SAVE_TO_FAV, REMOVE_FROM_FAV } from "../utils/mutations";

const ListingCard = (props) => {
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
  const { loading, data } = useQuery(GET_ME);
  const [savePost] = useMutation(SAVE_TO_FAV);
  const [removePost] = useMutation(REMOVE_FROM_FAV);
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
    return () => savePostIds(savedPostIds);
  });

  return (
    <>
      <Container>
        <div className="col-xs-12 col-sm-5 col-md-5 col-lg-4">
          {/* src=props.post.image */}
          <img
            src="https://hips.hearstapps.com/hmg-prod/images/2023-porsche-911-gt3-rs-201-1660575621.jpg?crop=0.755xw:0.567xh;0.0833xw,0.257xh&resize=1200:*"
            alt={props.post.model}
            width="100%"
          />
        </div>
        <div className="col-xs-12 col-sm-7 col-md-7 col-lg-8">
          <h3>Make: {props.post.make}</h3>
          <h3>Model: {props.post.model}</h3>
          <h3>Year: {props.post.year}</h3>
          <h3>Type: {props.post.carType}</h3>
          <h3>Location: {props.post.location}</h3>
          <h3>Mileage: {props.post.mileage}</h3>
          <h3>Transmission: {props.post.transmission}</h3>
          <h3>Description: {props.post.description}</h3>
          <h3>Created: {props.post.createdAt}</h3>
          <h3>Price: {props.post.price}</h3>
          <h3>Likes: {props.post.liked.length}</h3>
          {button}
        </div>
      </Container>
    </>
  );
};

export default ListingCard;

// Use props to get data
