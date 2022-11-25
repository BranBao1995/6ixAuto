import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import ListingCard from "../components/ListingCard";

const DreamList = () => {
  const { loading, data } = useQuery(GET_ME);
  let userData = data?.me || {};
  console.log(userData);
  const onRemoveHandler = async () => {
    window.location.replace("/dreamlist");
  };

  return (
    <main>
      <h1>{loading ? "Loading..." : "Your saved listings"}</h1>
      <section>
        {userData.interested?.map((listing) => {
          return (
            <div key={listing._id} className="listCard-container">
              <ListingCard post={listing} />
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default DreamList;
