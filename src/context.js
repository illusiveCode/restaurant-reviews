// Exporting Hook function from 'react'
import { createContext } from "react";

//Exporting everthing this function returns
export default createContext({
  restaurants: [],
  filtered: [],
  filter: 0,
});
