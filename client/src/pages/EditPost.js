import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { GET_POST } from "../utils/queries";
import { UPDATE_POST } from "../utils/mutations";

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

const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const { data } = useQuery(GET_POST, {
    variables: { postId: postId },
  });

  // const initialStates = {
  //   make: data.getPost.make,
  //   model: data.getPost.model,
  //   year: data.getPost.year,
  //   carType: data.getPost.carType,
  //   price: data.getPost.price,
  //   mileage: data.getPost.mileage,
  //   transmission: data.getPost.transmission,
  //   location: data.getPost.location,
  //   description: data.getPost.description,
  //   image: data.getPost.image,
  // };
  const [make, setMake] = useState(data.getPost.make);
  const [model, setModel] = useState(data.getPost.model);
  const [year, setYear] = useState(data.getPost.year);
  const [carType, setCarType] = useState(data.getPost.carType);
  const [location, setLocation] = useState(data.getPost.location);
  const [price, setPrice] = useState(data.getPost.price);
  const [mileage, setMileage] = useState(data.getPost.mileage);
  const [transmission, setTransmission] = useState(data.getPost.transmission);
  const [image, setImage] = useState(data.getPost.image);
  const [description, setDescription] = useState(data.getPost.description);

  // const [formInputs, setFormInputs] = useState(initialStates);

  const [characterCount, setCharacterCount] = useState(0);

  const [updatePost, { error }] = useMutation(UPDATE_POST);

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

  // const mutateFormInputs = (e) => {
  //   const inputName = e.target.name;
  //   const inputValue = e.target.value
  //   setFormInputs({...formInputs, inputName: inputValue});
  // }

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
          price: price,
          mileage: mileage,
          transmission: transmission,
          location: location,
          description: description,
          image: image,
          updatedAt: Date.now,
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
                <option
                  key={make.id}
                  value={make.value}
                  selected={make.value == data.getPost.make}
                >
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
                    <option
                      key={model.id}
                      value={model.value}
                      selected={model.value == data.getPost.model}
                    >
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
            <label>Add Car Type</label>
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
            <div>
              <button onClick={() => widgetRef.current.open()}>Upload</button>
            </div>
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

export default EditPost;
