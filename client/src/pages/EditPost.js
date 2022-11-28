import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { GET_POST } from "../utils/queries";
import { UPDATE_POST } from "../utils/mutations";
import { MakesArray, ModelsArray } from "../utils/seeds";

const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const { loading, data } = useQuery(GET_POST, {
    variables: { postId: postId },
  });

  const postData = data?.getPost || {};
  // console.log(postData);

  const [make, setMake] = useState(postData.make);
  const [model, setModel] = useState(postData.model);
  const [year, setYear] = useState(postData.year);
  const [carType, setCarType] = useState(postData.carType);
  const [location, setLocation] = useState(postData.location);
  const [price, setPrice] = useState(postData.price);
  const [mileage, setMileage] = useState(postData.mileage);
  const [transmission, setTransmission] = useState(postData.transmission);
  const [image, setImage] = useState(postData.image);
  const [description, setDescription] = useState(postData.description);

  const [characterCount, setCharacterCount] = useState(0);

  const [photoURL, setPhotoURL] = useState("");

  const [updatePost] = useMutation(UPDATE_POST);

  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "davswvpty",
        uploadPreset: "hwu5iwft",
        maxImageFileSize: 2000000,
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
    // console.log(
    //   make,
    //   model,
    //   year,
    //   carType,
    //   location,
    //   mileage,
    //   price,
    //   transmission,
    //   image,
    //   description
    // );
    try {
      const { data } = await updatePost({
        variables: {
          postId: postId,
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
          updatedAt: time,
        },
      });

      navigate(`/mylistings`);
      // console.log("changes made!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {data ? (
        <div className="py-5 my-listing-header">
          <h2 className="text-center mt-3"> Edit your post! </h2>
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
                  <option> Pick a Make </option>
                  {MakesArray.map((make) => (
                    <option
                      key={make.id}
                      value={make.value}
                      selected={make.value == postData.make ? true : false}
                    >
                      {make.label}
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
                  <option> Pick a Model</option>
                  {ModelsArray.filter((model) => model.make === make).map(
                    (model) => (
                      <option
                        key={model.id}
                        value={model.value}
                        selected={model.value == postData.model ? true : false}
                      >
                        {model.value}
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
              <div className="mt-2">
                <label className="form-label">Year</label>
                <input
                  required
                  className="form-control"
                  name="year"
                  type="text"
                  placeholder="Year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>
              <div className="mt-2">
                <label className="form-label">Car Type</label>
                <select
                  required
                  className="form-select"
                  name="carType"
                  onChange={(e) => setCarType(e.target.value)}
                >
                  <option>Pick a Car Type</option>
                  <option
                    value="Coupe"
                    selected={postData.carType == "Coupe" ? true : false}
                  >
                    Coupe
                  </option>
                  <option
                    value="Sedan"
                    selected={postData.carType == "Sedan" ? true : false}
                  >
                    Sedan
                  </option>
                  <option
                    value="SUV"
                    selected={postData.carType == "SUV" ? true : false}
                  >
                    SUV
                  </option>
                  <option
                    value="Hatchback"
                    selected={postData.carType == "Hatchback" ? true : false}
                  >
                    Hatchback
                  </option>
                  <option
                    value="Pickup"
                    selected={postData.carType == "Pickup" ? true : false}
                  >
                    Pickup
                  </option>
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
                  value={location}
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
                  value={price}
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
                  value={mileage}
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
                  <option> Pick Transmission</option>
                  <option
                    value="Automatic"
                    selected={
                      postData.transmission == "Automatic" ? true : false
                    }
                  >
                    Automatic
                  </option>
                  <option
                    value="Manual"
                    selected={postData.carType == "Manual" ? true : false}
                  >
                    Manual
                  </option>
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
                <p> Characters: {characterCount} / 400 </p>
                <textarea
                  maxLength="400"
                  minLength="1"
                  required
                  className="textarea form-control"
                  name="description"
                  value={description}
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
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default EditPost;
