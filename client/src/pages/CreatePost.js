// import CloudinaryUploadWidget from "./CloudinaryUploadWidget";
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
// import {  } from "../utils/queries";
import { MAKE_POST } from "../utils/mutations";
import { useNavigate } from "react-router-dom";


const CreatePost = () => {
  const navigate = useNavigate();

  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [carType, setCarType] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState(0);
  const [mileage, setMileage] = useState(0);
  const [transmission, setTransmission] = useState('');
  const [description, setDescription] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [post, { error }] = useMutation(MAKE_POST);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(
      make,
      model,
      year,
      carType,
      location,
      mileage,
      price,
      transmission,
      description
    );
    try {
      const { data } = await post({
        variables: {
          make,
          model,
          year,
          carType,
          location,
          mileage,
          price,
          transmission,
          description,
        },
      });

      // navigate(`/mylistings`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h4> Create a post! </h4>
      {Auth.loggedIn() ? (
        <div>
          <form className="d-flex flex-column" onSubmit={handleFormSubmit}>
            <label>Add make</label>
            <input
              required
              className=""
              name="make"
              onChange={(e) => setMake(e.target.value)}
              type="text"
              placeholder="Name"
            />
            <label>Add model</label>
            <input
              required
              className=""
              name="model"
              onChange={(e) => setModel(e.target.value)}
              type="text"
              placeholder="Name"
            />
            <label>year</label>
            <input
              required
              className=""
              name="year"
              onChange={(e) => setYear(e.target.value)}
              type="text"
              placeholder="Name"
            />
            <label>Add carType</label>
            <input
              required
              className=""
              name="carType"
              onChange={(e) => setCarType(e.target.value)}
              type="text"
              placeholder="Name"
            />
            <label>Add location</label>
            <input
              required
              className=""
              name="location"
              onChange={(e) => setLocation(e.target.value)}
              type="text"
              placeholder="Name"
            />
            <label>Add price</label>
            <input
              required
              className=""
              name="price"
              onChange={(e) => setPrice(parseInt(e.target.value))}
              type="text"
              placeholder="Name"
            />
            <label>Add mileage</label>
            <input
              required
              className=""
              name="mileage"
              onChange={(e) => setMileage(parseInt(e.target.value))}
              type="text"
              placeholder="Name"
            />
            <label>Add transmission</label>
            <input
              required
              className=""
              name="transmission"
              onChange={(e) => setTransmission(e.target.value)}
              type="text"
              placeholder="Name"
            />
            <label>Add image</label>
            <div>image here</div>
            <label>Add description</label>
            <input
              required
              className=""
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="Name"
            />
            <button type="submit"> Submit </button>
          </form>
        </div>
      ) : (
        <div>yolo</div>
      )}
    </>
  );
};

export default CreatePost;
