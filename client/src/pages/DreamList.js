import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import ListingCard from "../components/ListingCard";

const DreamList = () => {
  console.log("COMPONENT MOUNTED!");

  const { loading, data, refetch } = useQuery(GET_ME);
  refetch();
  const userData = data?.me || {};
  console.log(userData);
  const onRemoveHandler = async (clicked) => {
    if (clicked) {
      refetch();
    }
    return;
  };

  return (
    <main>
      <div className="py-5 my-listing-header">
        <h1>{loading ? "Loading..." : "DreamList"}</h1>
      </div>
      <section className="my-listing-container">
        {userData.interested?.map((listing) => {
          return (
            <div key={listing._id} className="listCard-container">
              <ListingCard post={listing} onRemove={onRemoveHandler} />
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default DreamList;
