import React, {useState} from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import {
  SiBmw,
  SiMercedes,
  SiAudi,
  SiHonda,
  SiToyota,
  SiHyundai,
  SiFord,
  SiChevrolet,
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
    name: "Chevrolet",
    logo: <SiChevrolet />,
  },
  {
    id:5,
    name: "Ford",
    logo: <SiFord />,
  },
  {
    id:6,
    name: "Honda",
    logo: <SiHonda />,
  },
  {
    id:7,
    name: "Hyundai",
    logo: <SiHyundai />,
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

const MakeCard = (props) => {
  const [isActive, setIsActive] = useState("");
  const blank = ""

  return (
    <>
      <div className="m-5 p-3 bg-light row">
        {/* use map function to show all  */}
        {makes.map((logo) => (
          <div
            key={logo.id}
            className="col-4 d-flex justify-content-center p-3 "
          >
            <span
              id={logo.name}
              className={isActive === logo.name ? "selected-make icon make-logo p-1" : "icon make-logo p-1"}
              onClick={() => {
                setIsActive(logo.name)
                props.onSelect(logo.name, blank);
              }}
            >
              {logo.logo}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default MakeCard;
