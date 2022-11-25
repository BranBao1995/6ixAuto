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

  return (
    <div className="results">
      {props.selections.make} {props.selections.model}
      {postData?.map((post) => {
        return <ListingCard post={post} />;
      })}
    </div>
  );
};

export default SearchResults;
