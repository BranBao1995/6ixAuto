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

  // console.log(make);
  // console.log(model);
  // console.log(year);
  // console.log(carType);
  // console.log(location);
  // console.log(price);
  // console.log(mileage);
  // console.log(transmission);
  // console.log(image);
  // console.log(description);

  // const [make, setMake] = useState();
  // const [model, setModel] = useState();
  // const [year, setYear] = useState();
  // const [carType, setCarType] = useState();
  // const [location, setLocation] = useState();
  // const [price, setPrice] = useState();
  // const [mileage, setMileage] = useState();
  // const [transmission, setTransmission] = useState();
  // const [image, setImage] = useState();
  // const [description, setDescription] = useState();

  const [characterCount, setCharacterCount] = useState(0);

  const [updatePost] = useMutation(UPDATE_POST);

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
      const { data } = await updatePost({
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
          // updatedAt: Date.now,
        },
      });

      // navigate(`/mylistings`);
      console.log("changes made!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {data ? (
        <div className="">
          <h4> Edit your post! </h4>
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
                  <option
                    key={make.id}
                    value={make.value}
                    selected={make.value == postData.make ? true : false}
                  >
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

              <label>Year</label>
              <input
                required
                className=""
                name="year"
                type="text"
                placeholder="Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
              <label>Car Type</label>
              <select
                required
                className=""
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
              <label>Location</label>
              <input
                required
                className=""
                name="location"
                onChange={(e) => setLocation(e.target.value)}
                type="text"
                placeholder="Location"
                value={location}
              />
              <label>Price</label>
              <input
                required
                className=""
                name="price"
                onChange={(e) => setPrice(e.target.value)}
                type="text"
                value={price}
              />
              <label>Mileage</label>
              <input
                required
                className=""
                name="mileage"
                onChange={(e) => setMileage(e.target.value)}
                type="text"
                value={mileage}
              />
              <label>Transmission</label>
              <select
                required
                className=""
                name="transmission"
                onChange={(e) => setTransmission(e.target.value)}
              >
                <option> Pick Transmission</option>
                <option
                  value="Automatic"
                  selected={postData.transmission == "Automatic" ? true : false}
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
              <label>Image</label>
              <div>
                <button type="button" onClick={() => widgetRef.current.open()}>
                  Upload
                </button>
              </div>
              <label>Description</label>
              <p> {characterCount} / 400 </p>
              <textarea
                maxLength="400"
                minLength="1"
                required
                className="textarea"
                name="description"
                value={description}
                onChange={(e) => {
                  setCharacterCount(e.target.value.length);
                  setDescription(e.target.value);
                }}
                type="text"
              />
              <button type="submit"> Submit </button>
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
