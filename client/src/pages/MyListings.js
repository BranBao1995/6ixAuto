import React from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import ListingCard from "../components/ListingCard";
import { DELETE_POST } from "../utils/mutations";
// import {  } from "../utils/queries";
// import {  } from "../utils/mutations";

const MyListings = () => {
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || {};

  console.log(userData);

  const [deletePost] = useMutation(DELETE_POST);

  const deletePostHandler = async (postId) => {
    try {
      const { userData } = await deletePost({
        variables: { postId: postId },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main>
      <h1>{loading ? "Loading..." : "Your saved listings"}</h1>
      <section>
        {userData.listings?.map((listing) => {
          return (
            <div className="listCard-container">
              <ListingCard post={listing} />
              {/* <button
                className="delete-post-btn"
                onClick={() => deletePostHandler(listing._id)}
              >
                Delete
              </button> */}
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default MyListings;
