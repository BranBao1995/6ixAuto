import React from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import ListingCard from "../components/ListingCard";
// import {  } from "../utils/queries";
// import {  } from "../utils/mutations";

const MyListings = () => {
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || [];

  return (
    <main>
      <h1>{loading ? "Loading..." : "Your saved listings"}</h1>
      <section>
        {userData.listings?.map((listing) => {
          return (
            <ListingCard
              make={listing.make}
              model={listing.model}
              year={listing.year}
              carType={listing.carType}
              location={listing.location}
            />
          );
        })}
      </section>
    </main>
  );
};

export default MyListings;
