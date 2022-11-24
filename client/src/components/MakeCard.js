import React, {useState} from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import ModelCard from "./ModelCard";
import {
  SiBmw,
  SiMercedes,
  SiAudi,
  SiHonda,
  SiToyota,
  SiHyundai,
  SiFerrari,
  SiLamborghini,
  SiBentley,
  SiVolkswagen,
} from "react-icons/si";
  
import './MakeCard.css'
// import {  } from "../utils/queries";
// import {  } from "../utils/mutations";



const makes = [
  {
    name: "Audi",
    logo: <SiAudi />,
  },
  {
    name: "Bentley",
    logo: <SiBentley />,
  },
  {
    name: "BMW",
    logo: <SiBmw />,
  },
  {
    name: "Ferrari",
    logo: <SiFerrari />,
  },
  {
    name: "Honda",
    logo: <SiHonda />,
  },
  {
    name: "Hyundai",
    logo: <SiHyundai />,
  },
  {
    name: "Lamborghini",
    logo: <SiLamborghini />,
  },
  {
    name: "Mercedes",
    logo: <SiMercedes />,
  },
  {
    name: "Toyota",
    logo: <SiToyota />,
  },
  {
    name: "Volkswagen",
    logo: <SiVolkswagen />,
  },
];

const MakeCard = () => {
  const [make, setMake] = useState("");

  const handleMake = (event) => {
    event.preventDefault();

    const { key } = event.target;

    setMake(key);
  }; 

  return (
    <div className="mt-3 mb-5 p-3 bg-light row">
      {/* use map function to show all  */}
      {makes.map((logo) => (
        <div className="col-4 d-flex justify-content-center p-3 ">
          <span
            key={logo.name}
            className="icon logo p-1"
            onClick={() => handleMake}
          >
            {logo.logo}
          </span>
        </div>
      ))}
      {make ? (
        <ModelCard make={make}/>
      ) : (
         <p>Choose a make!</p>
      )}
    </div>
  );
};

export default MakeCard;
