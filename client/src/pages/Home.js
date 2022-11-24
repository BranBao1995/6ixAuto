import React from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";

import ListingCard from "../components/ListingCard";
import MakeCard from "../components/MakeCard"

// import {  } from "../utils/queries";
// import {  } from "../utils/mutations";

const Home = () => {
  return (
    <>
    <div className="">
      <div className="mt-2 p-5 bg-primary text-white rounded d-flex flex-column">
        <h1>Welcome to 6ixAuto! 'insert welcome user text here' </h1>
        <p>Search for your dream car!</p>
      </div>
      <div className="mt-5 d-flex justify-content-center p-2 bg-secondary">
        <h3> Select Your Make!</h3>
      </div>
    </div>
    <MakeCard/>
    </>
  );
};

export default Home;
