import React, {useState} from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";

const models = [
  {
    id: 1,
    make: "Honda",
    model: "Civic",
  },
  {
    id: 2,
    make: "Honda",
    model: "Accord",
  },
  {
    id: 3,
    make: "Toyota",
    model: "Camry",
  },
  {
    id: 4,
    make: "Toyota",
    model: "Corolla",
  },
];



const ModelCard = (props) => {
  const [isActive, setIsActive] = useState("");

  const makeModel = models.filter( model => model.make === props.make)

  return (
    <div className="mt-3 mb-3 p-3 bg-light d-flex justify-content-around">
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