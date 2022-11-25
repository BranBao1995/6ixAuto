import React, { createContext, useContext } from "react";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const post = {
    postId: "",
    make: "",
    model: "",
    year: "",
    carType: "",
    price: 0,
    mileage: 0,
    transmission: "",
    location: "",
    description: "",
    image: "",
    createdAt: Date.now,
    updatedAt: Date.now,
  };

  return (
    <GlobalContext.Provider value={{ post }}>{children}</GlobalContext.Provider>
  );
};
