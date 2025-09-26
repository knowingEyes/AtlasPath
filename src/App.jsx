import {  Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Discover } from "./pages/Discover";
import { HomePage } from "./pages/HomePage";
import Map from "./pages/Map";
import { Cities } from "./pages/Cities";
import { Countries } from "./pages/Countries";
import { CityDetails } from "./pages/CityDetails";
import { CitiesProvider } from "./contexts/CitiesContext";
import { Stats } from "./pages/Stats";
import { LandingPage } from "./pages/LandingPage";

function App() {
  return (
    <CitiesProvider>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="app" element={<Layout />}>
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
