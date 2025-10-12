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

  //This reduce returns a filtred array of a country reoccurence
  const countriesVisited = visitedCities.reduce((acc, { country }) => {
    if (!acc.map((country) => country.country).includes(country.country_name)) {
      return [
        ...acc,
        { country: country.country_name, code: country.country_code },
      ];
    } else return acc;
  }, []);

  const handleNewCity = (newCity) =>
    dispatch({ type: "ADD_CITY", payload: [newCity, ...visitedCities] });
  return (
    <CitiesContext.Provider
      value={{ city, handleNewCity, visitedCities, position, countriesVisited }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

export { CitiesContext, CitiesProvider };
