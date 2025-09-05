import { createContext, useEffect, useReducer } from "react";
import { useQueryString } from "../hooks/useQueryString";
const BASE_URL = "https://us1.locationiq.com/v1";
const initialValue = { city: "", visitedCities: [] };
const CitiesContext = createContext();
const ApiToken = import.meta.env.VITE_LOCATIONIQ_TOKEN;
function reducer(state, action) {
  switch (action.type) {
    case "setcity":
      return { ...state, city: action.payload };
    case "ADD_CITY":
      return {
        ...state,
        visitedCities: action.payload
      };
    default:
      break;
  }
}

const CitiesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValue);
  const [lat, lon] = useQueryString();
  const { city, visitedCities } = state;
  useEffect(()=> {
      dispatch({
      type: "ADD_CITY",
      payload: JSON.parse(localStorage.getItem("visitedCities")) ?? [],
    });
  },[])
  useEffect(() => {
    if (!visitedCities) return;
    localStorage.setItem("visitedCities", JSON.stringify(visitedCities));

  }, [visitedCities]);
  async function getCity() {
    if (!lon && !lat) return;
    const res = await fetch(
      `${BASE_URL}/reverse?key=${ApiToken}&lat=${lat}&lon=${lon}&format=json&`
    );
    const data = await res.json();
    dispatch({ type: "setcity", payload: data });
  }
  // console.log(visitedCities)
  const handleNewCity = (newCity) => {
    dispatch({ type: "ADD_CITY", payload: [...visitedCities, newCity] });
  };

  return (
    <CitiesContext.Provider
      value={{ getCity, city, handleNewCity, visitedCities }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

export { CitiesContext, CitiesProvider };
