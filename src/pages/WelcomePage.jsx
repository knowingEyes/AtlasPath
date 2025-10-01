import {  useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import backgroundImage from "../../public/timo-wagner-fT6-YkB0nfg-unsplash.jpg";
import { useIsNew } from "../hooks/useIsNew";
export const Welcome = () => {
  const navigate = useNavigate();
const {setIsNew} = useIsNew()
// console.log(setIsNew)
  return (
    <section
      style={{ background: `url(${backgroundImage}) center/cover ` }}
      className="text-center justify-center h-screen  overflow-y-hidden text-white"
    >
      <div className="bg-gradient-to-t from-[#121212] to-[#121212]/30 absolute inset-0 "></div>
      <div className="absolute  flex flex-col items-center h-screen justify-center z-999 w-full p-5">
        <h1 className="mt-2 text-4xl font-semibold">
          Transform Your Travels into a Visual Journal
        </h1>
        <p className="mt-2 text-md">
          Log Cities, Dates, and Memories on Your personal World Map.
        </p>
        <div className="mt-20">
          <p className="text-sm text-gray-200">
            Please note: some of images you see are provided by a third-party
            service. They may not always be geographically accurate.
          </p>
        </div>

        <Button
        gradient={false}
          onClick={() => {
            setIsNew(false)
            navigate("/app")
          }
          }
          styles="mt-30 font-semibold px-10 text-[1rem] rounded bg-white text-black"
        >
          Start
        </Button>
      </div>
    </section>
  );
};
