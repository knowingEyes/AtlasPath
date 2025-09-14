import {  Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Discover } from "./components/Discover";
import { HomePage } from "./components/HomePage";
import Map from "./components/Map";
import { Cities } from "./components/Cities";
import { Countries } from "./components/Countries";
import { CityDetails } from "./components/CityDetails";
import { CitiesProvider } from "./contexts/CitiesContext";
import { Stats } from "./components/Stats";

function App() {
  return (
    <CitiesProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="homepage" replace />} />
          <Route path="homepage" element={<HomePage />}>
            <Route index element={<Navigate to="cities" replace />} />
            <Route path="cities" element={<Cities />} />
            <Route path="countries" element={<Countries />} />
          </Route>
          <Route path="map" element={<Map />} />
          <Route path="discover" element={<Discover />} />
          <Route path="stats" element={<Stats />} />
        </Route>
        <Route path="cities/:id" element={<CityDetails />} />
        <Route
          path="*"
          element={<p className="text-2xl text-center">page not found :(</p>}
        />
      </Routes>
    </CitiesProvider>
  );
}

export default App;
