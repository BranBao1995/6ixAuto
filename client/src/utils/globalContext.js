import React, { createContext, useContext } from "react";

// Initialize new context for students
const GlobalContext = createContext();

// We create a custom hook to provide immediate usage of the student context value (students) in other components
export const useGlobalContext = () => useContext(GlobalContext);

// The provider is responsible for creating our state, updating the state, and persisting values to the children
export const GlobalProvider = ({ children }) => {
  const students = [
    {
      id: 1,
      name: "Sayid",
      major: "Computer Science",
    },
    {
      id: 2,
      name: "Sun-Hwa",
      major: "Data Science",
    },
  ];

  const majors = [
    "Mathematics",
    "Computer Science",
    "Art",
    "English",
    "Political Science",
    "Journalism",
    "Engineering",
  ];

  // The value prop expects an initial state object
  return (
    <GlobalContext.Provider value={{ students, majors }}>
      {/* We render children in our component so that any descendent can access the value from the provider */}
      {children}
    </GlobalContext.Provider>
  );
};
