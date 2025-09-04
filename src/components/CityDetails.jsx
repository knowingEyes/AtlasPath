import { FaArrowLeft } from "react-icons/fa";
import img from "../assets/jezael-melgoza-alY6_OpdwRQ-unsplash.jpg";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { useQueryString } from "../hooks/useQueryString";
import { useEffect, useState } from "react";
import { BottomSheet } from "./BottomSheet";
import { Form } from "./Form";
const LOCATIONIQ_BASE_URL = "https://us1.locationiq.com/v1";
const ApiToken = import.meta.env.VITE_LOCATIONIQ_TOKEN;
const WIKIPEDIA_BASE_URL = "https://en.wikipedia.org/api/rest_v1";
export const CityDetails = () => {
  const navigate = useNavigate();
  const [lat, lon] = useQueryString();
  const [cityInfo, setCityInfo] = useState("");
  const [aboutCity, setAboutCity] = useState("");
  const { address } = cityInfo || {};
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    async function getCity() {
      if (!lon && !lat) return;
      const res = await fetch(
        `${LOCATIONIQ_BASE_URL}/reverse?key=${ApiToken}&lat=${lat}&lon=${lon}&format=json&`
      );
      const data = await res.json();
      setCityInfo(data);
    }
    getCity();
  }, [lat, lon]);
  useEffect(() => {
    async function getAboutCity() {
      if (!address?.city) return;
      const res = await fetch(
        `${WIKIPEDIA_BASE_URL}/page/summary/${address?.city}`
      );
      const { description } = await res.json();
      setAboutCity(description);
    }
    getAboutCity();
  }, [address?.city]);
  return (
    <section className="h-screen text-white relative">
      <div
        className="h-[50%] relative"
        style={{ background: `url(${img}) center/cover` }}
      >
        <button
          className=" mt-20 p-3 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
        </button>
      </div>
      <BottomSheet>
        {!isOpen && (
          <>
            <header className="relative">
              {" "}
              <h1 className="text-2xl  font-bold">{address?.city}</h1>
              <p className="text-sm">{address?.country}</p>
              <span className="absolute top-1 right-0 text-xl">🖼</span>
            </header>
            <div className="mt-5 mb-3">
              <h1 className="font-bold">ABOUT</h1>
              <p className="text-sm ">{aboutCity}</p>
            </div>
            <div>
              <h2 className="font-bold mb-4">HIGHTLIGHT</h2>
            </div>
            <div>
              <h2 className="font-bold">Notes</h2>
              <div className="text-sm bg-gray-100 p-3 rounded-lg mt-1">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nesciunt labore dolores impedit. Neque harum delectus labore
                  nulla corporis, quia enim animi explicabo
                </p>
              </div>
            </div>

            <Button
              styles=" rounded-full w-full"
              onClick={() => setIsOpen((p) => !p)}
            >
              Save visit
            </Button>
          </>
        )}
        {isOpen && <Form setIsOpen={setIsOpen} cityInfo={cityInfo} />}
      </BottomSheet>
    </section>
  );
};
