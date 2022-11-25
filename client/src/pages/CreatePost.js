// import CloudinaryUploadWidget from "./CloudinaryUploadWidget";
import React, {useState} from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
// import {  } from "../utils/queries";
import { MAKE_POST } from "../utils/mutations";
import { useNavigate } from "react-router-dom";

const years = []

const CreatePost = () => {
  const navigate = useNavigate();
  const [posting, setPosting] = useState({
    make: '',
    model: '',
    year: '',
    carType: '',
    location: '',
    price: 0,
    mileage: 0,
    transmission: '',
    image: '',
    description: ''
  });

  const [characterCount, setCharacterCount] = useState(0);

  const [post, { error }] = useMutation(MAKE_POST) 
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await post({
        variables: {
          ...posting,
          user: {
            username: Auth.getProfile().data.username,
            email: Auth.getProfile().data.email,
            phone: Auth.getProfile().data.phone,
          },
        },
      });

      navigate(`/mylistings`);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <h4> Create a post! </h4>
      {Auth.loggedIn() ? (
        <div>
          <form>
            <label>Add make</label>
            <input id="make"></input>
            <label>Add model</label>
            <input id="model"></input>
            <label for="">year</label>
            <input
              type="number"
              id="year"
              min="1"
              
            ></input>
            <label>Add carType</label>
            <input id="carType"></input>
            <label>Add location</label>
            <input id="location"></input>
            <label>Add price</label>
            <input type="number" id="price"></input>
            <label>Add mileage</label>
            <input type="number" id="mileage"></input>
            <label>Add transmission</label>
            <input id="transmission"></input>
            <label>Add image</label>
            <div>image here</div>
            <label>Add description</label>
            <textarea id="description"></textarea>
          </form>
        </div>
      ) : (
        <div>yolo</div>
      )}
    </>
  );
};

export default CreatePost;
