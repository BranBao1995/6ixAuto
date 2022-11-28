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

  const [photoURL, setPhotoURL] = useState("");

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
        maxImageFileSize: 2000000,
        cropping: true,
        croppingAspectRatio: 1.5,
        showSkipCropButton: false,
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          setImage(result.info.secure_url);
          console.log(result.info.secure_url);
          setPhotoURL(result.info.secure_url);
        }
      }
    );
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const time = new Date();
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
          createdAt: time,
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
      <h2 className="text-center mt-3"> Create a post! </h2>
      {Auth.loggedIn() ? (
        <div className="m-3">
          <form className="d-flex flex-column" onSubmit={handleFormSubmit}>
            <div>
              <label className="form-label">Make</label>
              <select
                required
                className="form-select"
                name="make"
                onChange={(e) => setMake(e.target.value)}
              >
                <option selected="true" disabled="disabled">
                  Pick a Make
                </option>
                {MakesArray.map((make) => (
                  <option key={make.id} value={make.value}>
                    {make.value}
                  </option>
                ))}
              </select>
            </div>
            <label className="form-label mt-2">Model</label>
            {make ? (
              <select
                required
                className="form-select"
                name="model"
                onChange={(e) => setModel(e.target.value)}
              >
                <option selected="true" disabled="disabled">
                  Pick a Model
                </option>
                {ModelsArray.filter((model) => model.make === make).map(
                  (model) => (
                    <option key={model.id} value={model.value}>
                      {model.value}
                    </option>
                  )
                )}
              </select>
            ) : (
              <select
                disabled
                className="form-select"
                name="model"
                placeholder="Name"
              ></select>
            )}
            <div className="mt-2">
              <label className="form-label">Year</label>
              <input
                required
                className="form-control"
                name="year"
                onChange={(e) => setYear(e.target.value)}
                type="text"
                placeholder="Year"
              />
            </div>
            <div className="mt-2">
              <label className="form-label">CarType</label>
              <select
                required
                className="form-select"
                name="carType"
                onChange={(e) => setCarType(e.target.value)}
              >
                <option value="" selected="true" disabled="disabled">
                  Pick a Car Type
                </option>
                <option value="Coupe"> Coupe </option>
                <option value="Sedan"> Sedan </option>
                <option value="SUV"> SUV </option>
                <option value="Hatchback"> Hatchback </option>
                <option value="Pickup"> Pickup </option>
              </select>
            </div>
            <div className="mt-2">
              <label className="form-label">Location</label>
              <input
                required
                className="form-control"
                name="location"
                onChange={(e) => setLocation(e.target.value)}
                type="text"
                placeholder="Location"
              />
            </div>
            <div className="mt-2">
              <label className="form-label">Price</label>
              <input
                required
                className="form-control"
                name="price"
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                min="1"
                placeholder="Price"
              />
            </div>
            <div className="mt-2">
              <label className="form-label">Mileage</label>
              <input
                required
                className="form-control"
                name="mileage"
                onChange={(e) => setMileage(e.target.value)}
                type="number"
                min="1"
                placeholder="Mileage"
              />
            </div>
            <div className="mt-2">
              <label className="form-label">Transmission</label>
              <select
                required
                className="form-select"
                name="transmission"
                onChange={(e) => setTransmission(e.target.value)}
              >
                <option value="" selected="true" disabled="disabled">
                  Pick Transmission
                </option>
                <option value="Automatic"> Automatic </option>
                <option value="Manual"> Manual </option>
              </select>
            </div>
            <div className="mt-2">
              <label className="form-label">Image</label>
              <p>Upload: {photoURL}</p>
              <div>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => widgetRef.current.open()}
                >
                  Upload
                </button>
              </div>
            </div>
            <div className="mt-2 mb-2">
              <label className="form-label">Description</label>
              <p>Characters: {characterCount} / 400 </p>
              <textarea
                maxLength="400"
                minLength="1"
                required
                className="textarea form-control"
                name="description"
                onChange={(e) => {
                  setCharacterCount(e.target.value.length);
                  setDescription(e.target.value);
                }}
                type="text"
              />
            </div>
            <button className="mt-2 mb-4 btn btn-secondary" type="submit">
              Submit
            </button>
          </form>
        </div>
      ) : (
        <div className="d-flex justify-content-center mt-5 pt-5">
          <h1>You must Login first !</h1>
        </div>
      )}
    </>
  );
};

export default CreatePost;
