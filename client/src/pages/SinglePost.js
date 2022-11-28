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

  const handleSavePost = async (postId) => {
    try {
      const { userData } = await savePost({
        variables: { postId: postId },
      });

      setSavedPostIds([...savedPostIds, postId]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const { data } = await removePost({ variables: { postId } });

      console.log(data);

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
        className="btn-block btn-secondary"
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
    savePostIds(savedPostIds);
  });

  return (
    <>
      {data ? (
        <div className="mt-3">
          <div className="single-post-div">
            <img
              src={data.getPost.image}
              alt={data.getPost.model}
              width="100%"
            />
          </div>
          <div className="row title-price-container single-post-div">
            <div className="post-title col-md-9">
              <p>
                {data.getPost.year} {data.getPost.make} {data.getPost.model},{" "}
                {data.getPost.location}
              </p>
            </div>
            <div className="single-price col-md-3">
              <p>$ {data.getPost.price}</p>
            </div>
          </div>
          <div className="">
            <p className="like-count">👍 {data.getPost.liked.length}</p>
          </div>
          <div className="single-post-div row">
            <div className="table-column col-md-7">
              <h6>Specifications</h6>
              <table>
                <tr>
                  <td className="table-title-left">Make:</td>
                  <td className="table-data-left">{data.getPost.make}</td>
                </tr>
                <tr>
                  <td className="table-title-left">Model:</td>
                  <td className="table-data-left">{data.getPost.model}</td>
                </tr>
                <tr>
                  <td className="table-title-left">Year:</td>
                  <td className="table-data-left">{data.getPost.year}</td>
                </tr>
                <tr>
                  <td className="table-title-left">Type:</td>
                  <td className="table-data-left">{data.getPost.carType}</td>
                </tr>
                <tr>
                  <td className="table-title-left">Location:</td>
                  <td className="table-data-left">{data.getPost.location}</td>
                </tr>
                <tr>
                  <td className="table-title-left">Mileage:</td>
                  <td className="table-data-left">{data.getPost.mileage}</td>
                </tr>
                <tr>
                  <td className="table-title-left">Transmission:</td>
                  <td className="table-data-left">
                    {data.getPost.transmission}
                  </td>
                </tr>
              </table>
              <div className="desc-text-box-div">
                <h6>Description </h6>
                <div className="desc-text-box">
                  <p className="">{data.getPost.description}</p>
                </div>
              </div>
            </div>
            <div className="table-column col-md-5">
              <h6>Contact</h6>
              <table>
                <tr>
                  <td className="table-title-right">Posted by:</td>
                  <td className="table-data-right">
                    {data.getPost.user.username}
                  </td>
                </tr>
                <tr>
                  <td className="table-title-right">Contact email:</td>
                  <td className="table-data-right">
                    {data.getPost.user.email}
                  </td>
                </tr>
                <tr>
                  <td className="table-title-right">Contact phone:</td>
                  <td className="table-data-right">
                    {data.getPost.user.phone}
                  </td>
                </tr>
                <tr>
                  <td className="table-title-right">Created:</td>
                  <td className="table-data-right">
                    {new Date(data.getPost.createdAt).toUTCString()}
                  </td>
                </tr>
                <tr>
                  <td className="table-title-right">Last update:</td>
                  <td className="table-data-right">
                    {data.getPost.updatedAt == null
                      ? data.getPost.updatedAt
                      : new Date(data.getPost.updatedAt).toUTCString()}
                  </td>
                </tr>
              </table>
            </div>
            <div className="d-flex justify-content-between pt-2 mb-4">
              {Auth.loggedIn() &&
              data.getPost.user._id == Auth.getProfile().data._id ? (
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
              {button}
            </div>
          </div>
        </div>
      ) : (
        <div> Loading... </div>
      )}
    </>
  );
};

export default SinglePost;
