import React, {useState} from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { ModelsArray } from "../utils/seeds";
import './ModelCard.css'

const ModelCard = (props) => {
  const [isActive, setIsActive] = useState("");

  const makeModel = ModelsArray.filter( model => model.make === props.make)

  return (
    <div className="m-5 p-3 bg-light d-flex flex-column justify-content-center align-items-center">
      {makeModel.map((model) => (
        <h4
          className={
            isActive === model.model ? "logo selected" : "logo"
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