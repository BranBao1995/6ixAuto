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
    <div className="results">
      {props.selections.make} {props.selections.model}
      {postData?.map((post) => {
<<<<<<< HEAD
        return <ListingCard post={post} />;
=======
        console.log(post);
        return <ListingCard post={post} key={post._id} />;
>>>>>>> d2b48179ee03243a7b9bd0a58fcc9916a373a162
      })}
    </div>
  );
};

export default SearchResults;
