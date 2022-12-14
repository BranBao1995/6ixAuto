import React from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import ListingCard from "../components/ListingCard";
import { Navbar, Nav, Container, Modal, Tab, Button } from "react-bootstrap";
import { DELETE_POST } from "../utils/mutations";
import Auth from "../utils/auth";

const MyListings = () => {
  const { loading, data, error, refetch } = useQuery(GET_ME);
  refetch();
  const userData = data?.me || {};

  const [deletePost] = useMutation(DELETE_POST);

  const deletePostHandler = async (postId) => {
    try {
      const { updatedUserData } = await deletePost({
        variables: { postId: postId },
      });
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main>
      {error ? <p>{error.message}</p> : ""}
      <div className="py-5 my-listing-header">
        <h1>{loading ? "Loading..." : "My Listings"}</h1>
      </div>
      <section className="my-listing-container">
        {userData.listings?.map((listing) => {
          return (
            <div key={listing._id} className="">
              <Button
                className="delete-post-btn btn-block btn-danger"
                onClick={() => deletePostHandler(listing._id)}
              >
                Delete
              </Button>
              <ListingCard post={listing} />
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default MyListings;
