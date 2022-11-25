import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";

import ListingCard from "../components/ListingCard";
import MakeCard from "../components/MakeCard";
import ModelCard from "../components/ModelCard";
import SearchResults from "../components/SearchResult";

// import {  } from "../utils/queries";
// import {  } from "../utils/mutations";

const Home = () => {
  const [selections, setSelection] = useState({
    make: "",
    model: "",
  });

  console.log(selections);
  const [searchMode, setSearchMode] = useState(true);

  const setMakeHandler = (make) => {
    setSelection({ ...selections, make });
    console.log(`after clicking make the state is: ${selections}`);
  };

  const setModelHandler = (model) => {
    setSelection({ ...selections, model });
    setSearchMode(false);
    console.log(`after clicking model the state is: ${selections}`);
  };

  const setBackSearch = () => {
    setSearchMode(true);
  };

  return (
    <>
      <div className="">
        <div className="mt-2 p-5 bg-primary text-white rounded d-flex flex-column">
          <h1>Welcome to 6ixAuto! 'insert welcome user text here' </h1>
          <p>Search for your dream car!</p>
        </div>
        <div className="mt-5 d-flex justify-content-center p-2 bg-secondary">
          <h3> Select Your Make!</h3>
          {/* create a state to decide which one to render */}
          {searchMode ? (
            <div>
              <MakeCard onSelect={setMakeHandler} />
              {selections.make ? (
                <ModelCard onSelect={setModelHandler} make={selections.make} />
              ) : (
                <p> Select Your Model! </p>
              )}
              <button>submit</button>
            </div>
          ) : (
            <p> </p>
          )}
        </div>
      </div>
      <div className="searchResultsBox">
        {!searchMode ? (
          <div>
            <SearchResults selections={selections} />
            <button onClick={() => setBackSearch()}>Back to search</button>
          </div>
        ) : (
          <p></p>
        )}
      </div>
    </>
  );
};

export default Home;
