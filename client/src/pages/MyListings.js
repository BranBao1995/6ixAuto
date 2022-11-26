import React from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import ListingCard from "../components/ListingCard";
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
      <h1>{loading ? "Loading..." : "Listings created by you"}</h1>
      <section>
        {userData.listings?.map((listing) => {
          return (
            <div key={listing._id} className="listCard-container">
              <ListingCard post={listing} />
              <button
                className="delete-post-btn"
                onClick={() => deletePostHandler(listing._id)}
              >
                Delete
              </button>
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default MyListings;
