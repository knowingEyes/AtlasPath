import { FaArrowLeft } from "react-icons/fa";
import img from "../assets/jezael-melgoza-alY6_OpdwRQ-unsplash.jpg";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
export const CityDetails = () => {
  const navigate = useNavigate();
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
        <h1 className="text-2xl text-center absolute w-full bottom-9 font-bold">
          Villa Park Hotel
        </h1>
      </div>
      <div
        className="h-[52%] bg-white rounded-t-[20px]
       p-4 absolute w-full z-10 -translate-y-4 text-black"
      >
        <h1 className="font-bold">About Villa</h1>
        <p className="text-sm ">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi
          ullam praesentium repellat quia similique. Ea sit maxime veniam
          quaerat fugit excepturi aliquid dolore ex optio officiis, dignissimos
          tempora voluptates cumque.
        </p>
        <button type="submit"></button>
        <Button>Save visit </Button>
      </div>
    </section>
  );
};
