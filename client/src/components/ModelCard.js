import React, {useState} from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";

const models = [
  {
    id: 1,
    make: "Audi",
    model: "A5",
  },
  {
    id: 2,
    make: "Audi",
    model: "S4",
  },
  {
    id: 21,
    make: "Audi",
    model: "A3",
  },
  {
    id: 22,
    make: "Audi",
    model: "Q3",
  },
  {
    id: 23,
    make: "Audi",
    model: "Q7",
  },
  {
    id: 24,
    make: "Audi",
    model: "RS5",
  },
  {
    id: 3,
    make: "Bentley",
    model: "Continental GT",
  },
  {
    id: 25,
    make: "Bentley",
    model: "Flying Spur",
  },
  {
    id: 26,
    make: "Bentley",
    model: "Bentayga",
  },
  {
    id: 27,
    make: "BMW",
    model: "X5",
  },
  {
    id: 28,
    make: "BMW",
    model: "M3",
  },
  {
    id: 29,
    make: "BMW",
    model: "X3",
  },
  {
    id: 4,
    make: "BMW",
    model: "X1",
  },
  {
    id: 5,
    make: "BMW",
    model: "M4",
  },
  {
    id: 6,
    make: "BMW",
    model: "328i",
  },
  {
    id: 7,
    make: "Chevrolet",
    model: "Camaro",
  },
  {
    id: 8,
    make: "Chevrolet",
    model: "Silverado",
  },
  {
    id: 30,
    make: "Chevrolet",
    model: "Spark",
  },
  {
    id: 31,
    make: "Chevrolet",
    model: "Equinox",
  },
  {
    id: 32,
    make: "Chevrolet",
    model: "Tahoe",
  },
  {
    id: 33,
    make: "Chevrolet",
    model: "Cruze",
  },
  {
    id: 9,
    make: "Ford",
    model: "F150",
  },
  {
    id: 34,
    make: "Ford",
    model: "Explorer",
  },
  {
    id: 35,
    make: "Ford",
    model: "Bronco",
  },
  {
    id: 52,
    make: 'Ford',
    model: 'Mustang'
  },
  {
    id: 36,
    make: "Ford",
    model: "Expedition",
  },
  {
    id: 10,
    make: "Ford",
    model: "Escape",
  },
  {
    id: 11,
    make: "Honda",
    model: "Civic",
  },
  {
    id: 12,
    make: "Honda",
    model: "Accord",
  },
  {
    id: 37,
    make: "Honda",
    model: "CRV",
  },
  {
    id: 38,
    make: "Honda",
    model: "Pilot",
  },
  {
    id: 39,
    make: "Honda",
    model: "Ridgeline",
  },
  {
    id: 13,
    make: "Hyundai",
    model: "Elantra",
  },
  {
    id: 14,
    make: "Hyundai",
    model: "Sonata",
  },
  {
    id: 40,
    make: "Hyundai",
    model: "Santa Fe",
  },
  {
    id: 41,
    make: "Hyundai",
    model: "IONIC",
  },
  {
    id: 42,
    make: "Hyundai",
    model: "Tucson",
  },
  {
    id: 15,
    make: "Mercedes",
    model: "A-Class",
  },
  {
    id: 16,
    make: "Mercedes",
    model: "C-Class",
  },
  {
    id: 43,
    make: "Mercedes",
    model: "G-Class",
  },
  {
    id: 44,
    make: "Mercedes",
    model: "GLA",
  },
  {
    id: 45,
    make: "Mercedes",
    model: "GLC",
  },
  {
    id: 17,
    make: "Toyota",
    model: "Corolla",
  },
  {
    id: 18,
    make: "Toyota",
    model: "Camry",
  },
  {
    id: 46,
    make: "Toyota",
    model: "RAV4",
  },
  {
    id: 47,
    make: "Toyota",
    model: "Supra",
  },
  {
    id: 48,
    make: "Toyota",
    model: "Tacoma",
  },
  {
    id: 19,
    make: "Volkswagen",
    model: "Jetta",
  },
  {
    id: 20,
    make: "Volkswagen",
    model: "Golf",
  },
  {
    id: 49,
    make: "Volkswagen",
    model: "Tiguan",
  },
  {
    id: 50,
    make: "Volkswagen",
    model: "Taos",
  },
  {
    id: 51,
    make: "Volkswagen",
    model: "Atlas",
  },
];



const ModelCard = (props) => {
  const [isActive, setIsActive] = useState("");

  const makeModel = models.filter( model => model.make === props.make)

  return (
    <div className="m-5 p-3 bg-light d-flex flex-column justify-content-around">
      {makeModel.map((model) => (
        <h4
          className={
            isActive === model.model ? "border border-dark" : " "
          }
          key={model.id}
          onClick={() => {
            setIsActive(model.model);
            props.onSelect(model.model);
          }}
        >
          {model.model}
        </h4>
      ))}
    </div>
  );
};

export default ModelCard;