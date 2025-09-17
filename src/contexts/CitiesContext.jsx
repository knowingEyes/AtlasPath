import { createContext, useEffect, useReducer } from "react";
const initialValue = { visitedCities: [] };
const CitiesContext = createContext();
function reducer(state, action) {
  switch (action.type) {
    case "ADD_CITY":
      return {
        ...state,
        visitedCities: action.payload,
      };
    default:
      break;
  }
}

const CitiesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValue);
  const { city, visitedCities, position } = state;
  useEffect(() => {
    const savedCities = localStorage.getItem("visitedCities");
    dispatch({
      type: "ADD_CITY",
      payload: JSON.parse(savedCities),
    });
  }, []);
  useEffect(() => {
    if (!visitedCities) return;
    localStorage.setItem("visitedCities", JSON.stringify(visitedCities));
  }, [visitedCities]);
  
  const handleNewCity = (newCity) =>
    dispatch({ type: "ADD_CITY", payload: [...visitedCities, newCity] });
  return (
    <CitiesContext.Provider
      value={{ city, handleNewCity, visitedCities, position }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

export { CitiesContext, CitiesProvider };
