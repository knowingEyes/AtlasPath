import { createContext, useReducer } from "react";
const BASE_URL = "https://us1.locationiq.com/v1";
const initialValue = { city: "" };
const CitiesContext = createContext();
const ApiToken = import.meta.env.VITE_LOCATIONIQ_TOKEN;
function reducer(state, action) {
  switch (action.type) {
    case "setcity":
      return { ...state, city: action.payload };

    default:
      break;
  }
}

const CitiesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValue);
  const { city } = state;
  async function getCity(position) {
    if (!position) return;
    // const res = await fetch(
    //   `${BASE_URL}/reverse?key=${ApiToken}&lat=${position[0]}&lon=${position[1]}&format=json&`
    // );
    // const data = await res.json();
    // dispatch({ type: "setcity", payload: data });
  }

  return (
    <CitiesContext.Provider value={{ getCity, city }}>
      {children}
    </CitiesContext.Provider>
  );
};

export { CitiesContext, CitiesProvider };
