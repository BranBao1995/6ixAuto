import React, { useState } from "react";
import Auth from "../utils/auth";
import { Button, Alert } from "react-bootstrap";
import MakeCard from "../components/MakeCard";
import ModelCard from "../components/ModelCard";
import SearchResults from "../components/SearchResult";
import videoBg1 from "../assets/images/6ixAutoBg.mp4";
import videoBg2 from "../assets/images/Toronto.mp4";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import "../index.css";
import "animate.css";

const Home = () => {
  const [selections, setSelection] = useState({
    make: "",
    model: "",
  });

  const [showAlert, setShowAlert] = useState(false);

  // console.log(selections);
  const [searchMode, setSearchMode] = useState(true);

  const [activateSearch, setActivateSearch] = useState(false);

  const setMakeHandler = (make, model) => {
    setSelection({ ...selections, make, model });

    setTimeout(function () {
      window.scrollTo(0, document.body.scrollHeight);
    }, 100);
  };

  const setModelHandler = (model) => {
    setSelection({ ...selections, model });
    setTimeout(function () {
      window.scrollTo(0, document.body.scrollHeight);
    }, 100);
    return;
  };

  const setBackSearch = () => {
    setSearchMode(!searchMode);
  };

  return (
    <>
      <div className={activateSearch ? "search-main" : ""}>
        {searchMode ? (
          <div className="bg-video">
            <div className="overlay"></div>
            <video src={videoBg2} playsinline autoPlay loop muted></video>
            <div className="content text-center">
              <h1>Welcome to 6ixAuto!</h1>
              <h5>Search for your dream car</h5>
              {!Auth.loggedIn() ? <h5>Signup for more details</h5> : ""}
            </div>
          </div>
        ) : (
          <div className="bg-video">
            <div className="overlay"></div>
            <video src={videoBg1} playsinline autoPlay loop muted></video>
            <div className="content text-center">
              <h1>Welcome to 6ixAuto!</h1>
              <h5>Search for your dream car</h5>
              {!Auth.loggedIn() ? <h5>Signup for more details</h5> : ""}
            </div>
          </div>
        )}
        <div
          className={
            searchMode
              ? "mt-5 d-flex flex-column justify-content-center align-items-center p-2 container"
              : " "
          }
        >
          {searchMode ? (
            <>
              {activateSearch ? (
                <>
                  <h3 className="d-flex justify-content-center">
                    Select Your Make
                  </h3>
                  <div className="bg-secondary search-box animate__animated animate__slideInDown">
                    <MakeCard onSelect={setMakeHandler} />
                    {selections.make ? (
                      <>
                        <div className="animate__animated animate__slideInUp d-flex flex-column ">
                          <h3 className="text-center"> Select Your Model</h3>
                          <ModelCard
                            onSelect={setModelHandler}
                            make={selections.make}
                          />
                          <button
                            className="search btn btn-light"
                            onClick={() => {
                              if (selections.model) {
                                setActivateSearch(!activateSearch);
                                setSearchMode(!searchMode);
                              } else {
                                setShowAlert(!showAlert);
                              }
                            }}
                          >
                            <h5 className="m-1">Submit Search</h5>
                          </button>
                        </div>
                      </>
                    ) : (
                      <p> </p>
                    )}
                  </div>
                </>
              ) : (
                // start journey button
                <h3
                  className="d-flex justify-content-center sbtn start-btn text-center"
                  onClick={() => {
                    setActivateSearch(!activateSearch);
                    setTimeout(function () {
                      window.scrollTo(0, document.body.scrollHeight);
                    }, 100);
                  }}
                >
                  Begin Your Automotive Journey
                </h3>
              )}

              <Alert
                className="d-flex justify-content-between mt-3"
                onClose={() => setShowAlert(!showAlert)}
                show={showAlert}
                variant="danger"
              >
                <h5>Invalid Search Entry</h5>
                <div className="">
                  <Button
                    onClick={() => setShowAlert(!showAlert)}
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
      <div className={activateSearch ? "search-main" : ""}>
        {!searchMode ? (
          <>
            <div className="searchResultsBox">
              <button
                className="btn btn-dark mt-2 mb-2  back-btn"
                onClick={() => {
                  setActivateSearch(!activateSearch);
                  setBackSearch();
                }}
              >
                <BsFillArrowLeftCircleFill />
                &nbsp; Back to search
              </button>
              <SearchResults selections={selections} />
            </div>
          </>
        ) : (
          <p></p>
        )}
      </div>
    </>
  );
};

export default Home;
