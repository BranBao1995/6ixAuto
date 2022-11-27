import React, {useState} from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { ModelsArray } from "../utils/seeds";


const ModelCard = (props) => {
  const [isActive, setIsActive] = useState("");

  const makeModel = ModelsArray.filter( model => model.make === props.make)

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