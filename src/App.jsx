import {  Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Discover } from "./components/Discover";
import { Journal } from "./components/Journal";
import { HomePage } from "./components/HomePage";
import Map from "./components/Map";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="homepage" element={<HomePage />} />
        <Route path="map" element={<Map/>} />
        <Route path="discover" element={<Discover />} />
        <Route path="journal" element={<Journal />} />
        <Route
          path="*"
          element={<p className="text-2xl text-center">page not found :(</p>}
        />
      </Route>
    </Routes>
  );
}

export default App;
