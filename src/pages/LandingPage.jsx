import { useNavigate } from "react-router-dom";
import backgroundImage from "../../public/masood-aslami-35vD8GskqlM-unsplash.jpg";
import { Button } from "../components/Button";
export const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <section
      className="h-screen w-full pt-20 overflow-y-hidden relative text-white "
      style={{ background: `url(${backgroundImage}) center/cover` }}
    >
      <h6 className=" text-7xl text-center font-black">
        Atlas path <span className="align-super text-[1.5rem]">™</span>
      </h6>
      <p className="text-center mt-2">Every city has a story</p>
      <Button
        onClick={() => navigate("app")}
        gradient={false}
        styles=" rounded-lg py-3 px-5 bottom-20 mx-auto absolute -translate-x-[50%] left-[50%]  bg-black/20  text-[1rem] ring-1"
      >
        Enter Atlas's path
      </Button>
    </section>
  );
};
