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
    value: "Chevrolet",
    label: "Chevrolet",
  },
  {
    id: 6,
    value: "Ford",
    label: "Ford",
  },
  {
    id: 7,
    value: "Honda",
    label: "Honda",
  },
  {
    id: 8,
    value: "Hyundai",
    label: "Hyundai",
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
    make: "Audi",
    value: "A5",
    model: "A5",
  },
  {
    id: 2,
    make: "Audi",
    value: "S4",
    model: "S4",
  },
  {
    id: 21,
    make: "Audi",
    value: "A3",
    model: "A3",
  },
  {
    id: 22,
    make: "Audi",
    value: "Q3",
    model: "Q3",
  },
  {
    id: 23,
    make: "Audi",
    value: "Q7",
    model: "Q7",
  },
  {
    id: 24,
    make: "Audi",
    value: "RS5",
    model: "RS5",
  },
  {
    id: 3,
    make: "Bentley",
    value: "Continental GT",
    model: "Continental GT",
  },
  {
    id: 25,
    make: "Bentley",
    value: "Flying Spur",
    model: "Flying Spur",
  },
  {
    id: 26,
    make: "Bentley",
    value: "Bentayga",
    model: "Bentayga",
  },
  {
    id: 27,
    make: "BMW",
    value: "X5",
    model: "X5",
  },
  {
    id: 28,
    make: "BMW",
    value: "M3",
    model: "M3",
  },
  {
    id: 29,
    make: "BMW",
    value: "X3",
    model: "X3",
  },
  {
    id: 4,
    make: "BMW",
    value: "X1",
    model: "X1",
  },
  {
    id: 5,
    make: "BMW",
    value: "M4",
    model: "M4",
  },
  {
    id: 6,
    make: "BMW",
    value: "328i",
    model: "328i",
  },
  {
    id: 7,
    make: "Chevrolet",
    value: "Camaro",
    model: "Camaro",
  },
  {
    id: 8,
    make: "Chevrolet",
    value: "Silverado",
    model: "Silverado",
  },
  {
    id: 30,
    make: "Chevrolet",
    value: "Spark",
    model: "Spark",
  },
  {
    id: 31,
    make: "Chevrolet",
    value: "Equinox",
    model: "Equinox",
  },
  {
    id: 32,
    make: "Chevrolet",
    value: "Tahoe",
    model: "Tahoe",
  },
  {
    id: 33,
    make: "Chevrolet",
    value: "Cruze",
    model: "Cruze",
  },
  {
    id: 9,
    make: "Ford",
    value: "F150",
    model: "F150",
  },
  {
    id: 52,
    make: "Ford",
    value: "Mustang",
    model: "Mustang",
  },
  {
    id: 34,
    make: "Ford",
    value: "Explorer",
    model: "Explorer",
  },
  {
    id: 35,
    make: "Ford",
    value: "Bronco",
    model: "Bronco",
  },
  {
    id: 36,
    make: "Ford",
    value: "Expedition",
    model: "Expedition",
  },
  {
    id: 10,
    make: "Ford",
    value: "Escape",
    model: "Escape",
  },
  {
    id: 11,
    make: "Honda",
    value: "Civic",
    model: "Civic",
  },
  {
    id: 12,
    make: "Honda",
    value: "Accord",
    model: "Accord",
  },
  {
    id: 37,
    make: "Honda",
    value: "CRV",
    model: "CRV",
  },
  {
    id: 38,
    make: "Honda",
    value: "Pilot",
    model: "Pilot",
  },
  {
    id: 39,
    make: "Honda",
    value: "Ridgeline",
    model: "Ridgeline",
  },
  {
    id: 13,
    make: "Hyundai",
    value: "Elantra",
    model: "Elantra",
  },
  {
    id: 14,
    make: "Hyundai",
    value: "Sonata",
    model: "Sonata",
  },
  {
    id: 40,
    make: "Hyundai",
    value: "Santa Fe",
    model: "Santa Fe",
  },
  {
    id: 41,
    make: "Hyundai",
    value: "IONIC",
    model: "IONIC",
  },
  {
    id: 42,
    make: "Hyundai",
    value: "Tucson",
    model: "Tucson",
  },
  {
    id: 15,
    make: "Mercedes",
    value: "A-Class",
    model: "A-Class",
  },
  {
    id: 16,
    make: "Mercedes",
    value: "C-Class",
    model: "C-Class",
  },
  {
    id: 43,
    make: "Mercedes",
    value: "G-Class",
    model: "G-Class",
  },
  {
    id: 44,
    make: "Mercedes",
    value: "GLA",
    model: "GLA",
  },
  {
    id: 45,
    make: "Mercedes",
    value: "GLC",
    model: "GLC",
  },
  {
    id: 17,
    make: "Toyota",
    value: "Corolla",
    model: "Corolla",
  },
  {
    id: 18,
    make: "Toyota",
    value: "Camry",
    model: "Camry",
  },
  {
    id: 46,
    make: "Toyota",
    value: "RAV4",
    model: "RAV4",
  },
  {
    id: 47,
    make: "Toyota",
    value: "Supra",
    model: "Supra",
  },
  {
    id: 48,
    make: "Toyota",
    value: "Tacoma",
    model: "Tacoma",
  },
  {
    id: 19,
    make: "Volkswagen",
    value: "Jetta",
    model: "Jetta",
  },
  {
    id: 20,
    make: "Volkswagen",
    value: "Golf",
    model: "Golf",
  },
  {
    id: 49,
    make: "Volkswagen",
    value: "Tiguan",
    model: "Tiguan",
  },
  {
    id: 50,
    make: "Volkswagen",
    value: "Taos",
    model: "Taos",
  },
  {
    id: 51,
    make: "Volkswagen",
    value: "Atlas",
    model: "Atlas",
  },
];
const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const { loading, data, refetch } = useQuery(GET_POST, {
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
  // const [characterCount, setCharacterCount] = useState(0);

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

  const makeModel = models.filter((model) => model.make === make);

  return (
    <>
      {data ? (
        <div className="">
          <h4> Create a post! </h4>
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
                {makes.map((make) => (
                  <option
                    key={make.id}
                    value={make.value}
                    selected={make.value == postData.make ? true : false}
                  >
                    {" "}
                    {make.label}{" "}
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
                  {models
                    .filter((model) => model.make === make)
                    .map((model) => (
                      <option
                        key={model.id}
                        value={model.value}
                        selected={model.value == postData.model ? true : false}
                      >
                        {model.label}
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
                  {" "}
                  Coupe{" "}
                </option>
                <option
                  value="Sedan"
                  selected={postData.carType == "Sedan" ? true : false}
                >
                  {" "}
                  Sedan{" "}
                </option>
                <option
                  value="SUV"
                  selected={postData.carType == "SUV" ? true : false}
                >
                  {" "}
                  SUV{" "}
                </option>
                <option
                  value="Hatchback"
                  selected={postData.carType == "Hatchback" ? true : false}
                >
                  {" "}
                  Hatchback{" "}
                </option>
                <option
                  value="Pickup"
                  selected={postData.carType == "Pickup" ? true : false}
                >
                  {" "}
                  Pickup{" "}
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
                  {" "}
                  Automatic{" "}
                </option>
                <option
                  value="Manual"
                  selected={postData.carType == "Manual" ? true : false}
                >
                  {" "}
                  Manual{" "}
                </option>
              </select>
              <label>Image</label>
              <div>
                <button onClick={() => widgetRef.current.open()}>Upload</button>
              </div>
              <label>Description</label>
              <input
                required
                className=""
                name="description"
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                value={description}
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
