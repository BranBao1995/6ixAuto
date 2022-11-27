import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { Form, Button, Alert } from "react-bootstrap";
import ListingCard from "../components/ListingCard";
import MakeCard from "../components/MakeCard";
import ModelCard from "../components/ModelCard";
import SearchResults from "../components/SearchResult";
import videoBg from '../assets/images/6ixAutoBg.mp4'
import '../index.css'
// import {  } from "../utils/queries";
// import {  } from "../utils/mutations";

const Home = () => {
  const [selections, setSelection] = useState({
    make: "",
    model: "",
  });

  const [showAlert, setShowAlert] = useState(false);

  console.log(selections);
  const [searchMode, setSearchMode] = useState(true);

  const setMakeHandler = (make, model) => {
    setSelection({ ...selections, make, model });
    console.log(`after clicking make the state is: ${selections}`);
  };

  const setModelHandler = (model) => {
    setSelection({ ...selections, model });
    // setSearchMode(false);
    return;
  };

  const setBackSearch = () => {
    setSearchMode(true);
  };

  return (
    <>
      <div className="">
        <div className="bg-video">
          <div className="overlay"></div>
          <video src={videoBg} autoPlay loop muted></video>
          <div className="content">
            <h1>Welcome to 6ixAuto!</h1>
            <h5>Search for your dream car!</h5>
          </div>
        </div>
        <div className="mt-5 d-flex flex-column justify-content-center p-2 bg-secondary container">
          <h3> Select Your Make!</h3>

          {/* create a state to decide which one to render */}
          {searchMode ? (
            <>
              <div>
                <MakeCard onSelect={setMakeHandler} />
                {selections.make ? (
                  <ModelCard
                    onSelect={setModelHandler}
                    make={selections.make}
                  />
                ) : (
                  <p> Select Your Model! </p>
                )}
                <button
                  onClick={() => {
                    if (selections.model) {
                      setSearchMode(false);
                    } else {
                      setShowAlert(true);
                    }
                  }}
                >
                  Submit Search
                </button>
              </div>
              <Alert
                className="d-flex justify-content-between"
                onClose={() => setShowAlert(false)}
                show={showAlert}
                variant="danger"
              >
                <h5>Invalid Search Entry</h5>
                <div className="">
                  <Button
                    onClick={() => setShowAlert(false)}
                    variant="outline-secondary"
                  >
                    Close
                  </Button>
                </div>
              </Alert>
            </>
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
