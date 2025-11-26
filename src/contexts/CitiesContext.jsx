import { createContext, useEffect, useReducer } from "react";


const initialValue = { visitedCities: [] };
const CitiesContext = createContext();
function reducer(state, action) {
  switch (action.type) {
    case "GET_SAVED_CITIES":
      return {
        ...state,
        visitedCities: action.payload,
      };
    case "ADD_CITY":
      return {
        ...state,
        visitedCities: [...state.visitedCities, { ...action.payload }],
      };
    case "EDIT_NOTE":
      return {
        ...state,
        visitedCities: state.visitedCities.map((city) =>
          city.id === action.payload.id
            ? { ...city, note: action.payload.note }
            : city
        ),
      };
    case "DELETE_CITY":
      return {
        ...state,
        visitedCities: state.visitedCities.filter(
          (city) => city.id !== action.payload
        ),
      };
    default:
      return initialValue;
  }
}

const CitiesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValue);
  const { city, visitedCities, position } = state;

  useEffect(() => {
    const savedData =
      JSON.parse(localStorage.getItem("visitedCities")) || visitedCities;
    dispatch({
      type: "GET_SAVED_CITIES",
      payload: savedData,
    });
  }, []);

  useEffect(() => {
    if (!visitedCities.length) return;
    localStorage.setItem("visitedCities", JSON.stringify(visitedCities));
  }, [visitedCities]);
  console.log(visitedCities);
  //This reduce returns a filtred array of a country reoccurence
  const countriesVisited = visitedCities.reduce((acc, { country }) => {
    if (
      !acc.map((country) => country.country).includes(country?.country_name)
    ) {
      return [
        ...acc,
        { country: country?.country_name, code: country?.country_code },
      ];
    } else return acc;
  }, []);

  const handleNewCity = (newCity) =>
    dispatch({ type: "ADD_CITY", payload: newCity });
  const handleEdit = (id, note) => {
    console.log(id, note);
    dispatch({
      type: "EDIT_NOTE",
      payload: { id, note },
    });
  };
  const handleDelete = (id) =>
    dispatch({
      type: "DELETE_CITY",
      payload: id,
    });
  return (
    <CitiesContext.Provider
      value={{
        city,
        handleNewCity,
        visitedCities,
        position,
        countriesVisited,
        handleDelete,
        handleEdit,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

export { CitiesContext, CitiesProvider };
