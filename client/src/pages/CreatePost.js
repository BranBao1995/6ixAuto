// import CloudinaryUploadWidget from "./CloudinaryUploadWidget";
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
// import {  } from "../utils/queries";
import { MAKE_POST } from "../utils/mutations";
import { useNavigate } from "react-router-dom";


const makes = [
  {
    id: 2,
    value: "Audi",
    label: "Audi",
  },
  {
    id: 3,
    value: "Bentley",
    label: "Bentley",
  },
  {
    id: 4,
    value: "BMW",
    label: "BMW",
  },
  {
    id: 5,
    value: "Ferrari",
    label: "Ferrari",
  },
  {
    id: 6,
    value: "Honda",
    label: "Honda",
  },
  {
    id: 7,
    value: "Hyundai",
    label: "Hyundai",
  },
  {
    id: 8,
    value: "Lamborghini",
    label: "Lamborghini",
  },
  {
    id: 9,
    value: "Mercedes",
    label: "Mercedes",
  },
  {
    id: 10,
    value: "Toyota",
    label: "Toyota",
  },
  {
    id: 11,
    value: "Volkswagen",
    label: "Volkswagen",
  },
];

const models = [
  {
    id: 1,
    make: "Honda",
    value: "Civic",
    label: "Civic",
  },
  {
    id: 2,
    make: "Honda",
    value: "Accord",
    label: "Accord",
  },
  {
    id: 3,
    make: "Toyota",
    value: "Camry",
    label: "Camry",
  },
  {
    id: 4,
    make: "Toyota",
    value: "Corolla",
    label: "Corolla",
  },
];

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
  const [description, setDescription] = useState("");

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
          make: make,
          model: model,
          year: year,
          carType: carType,
          price: price,
          mileage: mileage,
          transmission: transmission,
          location: location,
          description: description,
          image: "image",
          createdAt: "Default",
        },
      });

      navigate(`/mylistings`);
    } catch (err) {
      console.error(err);
    }
  };

  const makeModel = models.filter((model) => model.make === make);

  return (
    <>
      <h4> Create a post! </h4>
      {Auth.loggedIn() ? (
        <div>
          <form className="d-flex flex-column" onSubmit={handleFormSubmit}>
            <label>Add make</label>
            <select
              required
              className=""
              name="make"
              onChange={(e) => setMake(e.target.value)}
            >
              <option> Pick a Make </option>
              {makes.map((make) => (
                <option key={make.id} value={make.value}>
                  {" "}
                  {make.label}{" "}
                </option>
              ))}
            </select>
            <label>Add model</label>
            {make ? (
              <select
                required
                className=""
                name="model"
                onChange={(e) => setModel(e.target.value)}
              >
                <option> Pick a Model</option>
                {models
                  .filter((model) => model.make === make)
                  .map((model) => (
                    <option key={model.id} value={model.value}>
                      {" "}
                      {model.label}{" "}
                    </option>
                  ))}
              </select>
            ) : (
              <select
                disabled
                className=""
                name="model"
                placeholder="Name"
              ></select>
            )}

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
            />
            <label>Add mileage</label>
            <input
              required
              className=""
              name="mileage"
              onChange={(e) => setMileage(parseInt(e.target.value))}
              type="text"
            />
            <label>Add transmission</label>
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
            <label>Add image</label>
            <div>image here</div>
            <label>Add description</label>
            <input
              required
              className=""
              name="description"
              onChange={(e) => setDescription(e.target.value)}
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
