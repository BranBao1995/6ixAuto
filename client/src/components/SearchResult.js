import React from "react";
// import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
// import { useMutation } from "@apollo/client";
import { GET_SEARCH } from "../utils/queries";
import ListingCard from "../components/ListingCard";

const SearchResults = (props) => {
  const { loading, data } = useQuery(GET_SEARCH, {
    variables: { make: props.selections.make, model: props.selections.model },
  });
  const postData = data?.searchResults || [];
  console.log(postData);

  return (
    <>
    { postData.length ? (
      <div className="results">
        {postData?.map((post) => {
          console.log(post);
          return <ListingCard post={post} key={post._id} />;
        })}
      </div>
    ) : ( 
    <div className="d-flex justify-content-center p-2"> 
      <h4> There are {postData.length} Search Results </h4>
    </div>)
    }
    </>
  );
};

export default SearchResults;
