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
    id: 1,
    name: "Audi",
    logo: <SiAudi />,
  },
  {
    id:2,
    name: "Bentley",
    logo: <SiBentley />,
  },
  {
    id:3,
    name: "BMW",
    logo: <SiBmw />,
  },
  {
    id:4,
    name: "Ferrari",
    logo: <SiFerrari />,
  },
  {
    id:5,
    name: "Honda",
    logo: <SiHonda />,
  },
  {
    id:6,
    name: "Hyundai",
    logo: <SiHyundai />,
  },
  {
    id:7,
    name: "Lamborghini",
    logo: <SiLamborghini />,
  },
  {
    id:8,
    name: "Mercedes",
    logo: <SiMercedes />,
  },
  {
    id:9,
    name: "Toyota",
    logo: <SiToyota />,
  },
  {
    id:10,
    name: "Volkswagen",
    logo: <SiVolkswagen />,
  },
];

const MakeCard = () => {
  const [make, setMake] = useState("");

  const handleMake = (name) => {
    console.log(name)
    setMake(name);
  }; 

  return (
    <>
    <div className="mt-3 mb-5 p-3 bg-light row">
      {/* use map function to show all  */}
      {makes.map((logo) => (
        <div
         key={logo.id}
         className="col-4 d-flex justify-content-center p-3 ">
          <span
            id={logo.name}
            className="icon logo p-1"
            onClick={() => handleMake(logo.name)}
          >
            {logo.logo}
          </span>
        </div>
      ))}
    </div>
    <div>
      {make ? (
        <ModelCard make={make}/>
      ) : (
         <p className="text-center">Choose a make!</p>
      )}
    </div>
    </>
  );
};

export default MakeCard;
