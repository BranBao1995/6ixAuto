// import CloudinaryUploadWidget from "./CloudinaryUploadWidget";
import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
// import {  } from "../utils/queries";
import { MAKE_POST } from "../utils/mutations";
import { useNavigate } from "react-router-dom";
import { MakesArray, ModelsArray } from "../utils/seeds";
import "./CreatePost.css";

const CreatePost = () => {
  const navigate = useNavigate();

  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [carType, setCarType] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState(0);
  const [mileage, setMileage] = useState(0);
  const [transmission, setTransmission] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const [characterCount, setCharacterCount] = useState(0);

  const [post, { error }] = useMutation(MAKE_POST);

  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "davswvpty",
        uploadPreset: "hwu5iwft",
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          setImage(result.info.secure_url);
          console.log(result.info.secure_url);
        }
      }
    );
  }, []);

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
      image,
      description
    );
    try {
      const { data } = await post({
        variables: {
          make: make,
          model: model,
          year: year,
          carType: carType,
          price: parseInt(price),
          mileage: parseInt(mileage),
          transmission: transmission,
          location: location,
          description: description,
          image: image,
          createdAt: "Default",
        },
      });

      navigate(`/mylistings`);
    } catch (err) {
      console.error(err);
    }
  };

  // const makeModel = models.filter((model) => model.make === make);

  return (
    <>
      <h4> Create a post! </h4>
      {Auth.loggedIn() ? (
        <div>
          <form className="d-flex flex-column" onSubmit={handleFormSubmit}>
            <label>Make</label>
            <select
              required
              className=""
              name="make"
              onChange={(e) => setMake(e.target.value)}
            >
              <option> Pick a Make </option>
              {MakesArray.map((make) => (
                <option key={make.id} value={make.value}>
                  {make.label}
                </option>
              ))}
            </select>
            <label>Model</label>
            {make ? (
              <select
                required
                className=""
                name="model"
                onChange={(e) => setModel(e.target.value)}
              >
                <option> Pick a Model</option>
                {ModelsArray.filter((model) => model.make === make).map(
                  (model) => (
                    <option key={model.id} value={model.value}>
                      {model.model}
                    </option>
                  )
                )}
              </select>
            ) : (
              <select
                disabled
                className=""
                name="model"
                placeholder="Name"
              ></select>
            )}

            <label>Year</label>
            <input
              required
              className=""
              name="year"
              onChange={(e) => setYear(e.target.value)}
              type="text"
              placeholder="Name"
            />
            <label>CarType</label>
            <select
              required
              className=""
              name="carType"
              onChange={(e) => setCarType(e.target.value)}
            >
              <option> Pick a Car Type</option>
              <option value="Coupe"> Coupe </option>
              <option value="Sedan"> Sedan </option>
              <option value="SUV"> SUV </option>
              <option value="Hatchback"> Hatchback </option>
              <option value="Pickup"> Pickup </option>
            </select>
            <label>Location</label>
            <input
              required
              className=""
              name="location"
              onChange={(e) => setLocation(e.target.value)}
              type="text"
              placeholder="Name"
            />
            <label>Price</label>
            <input
              required
              className=""
              name="price"
              onChange={(e) => setPrice(e.target.value)}
              type="text"
            />
            <label>Mileage</label>
            <input
              required
              className=""
              name="mileage"
              onChange={(e) => setMileage(e.target.value)}
              type="text"
            />
            <label>Transmission</label>
            <select
              required
              className=""
              name="transmission"
              onChange={(e) => setTransmission(e.target.value)}
            >
              <option> Pick Transmission</option>
              <option value="Automatic"> Automatic </option>
              <option value="Manual"> Manual </option>
            </select>
            <label>Image</label>
            <div>
              <button onClick={() => widgetRef.current.open()}>Upload</button>
            </div>
            <label>Description</label>
            <p> {characterCount} / 400 </p>
            <textarea
              maxLength="400"
              minLength="1"
              required
              className="textarea"
              name="description"
              onChange={(e) => {
                setCharacterCount(e.target.value.length);
                setDescription(e.target.value);
              }}
              type="text"
            />
            <button type="submit"> Submit </button>
          </form>
        </div>
      ) : (
        <div> You must Login first !</div>
      )}
    </>
  );
};

export default CreatePost;
