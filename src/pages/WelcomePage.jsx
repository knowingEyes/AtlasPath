import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import backgroundImage from "../../public/timo-wagner-fT6-YkB0nfg-unsplash.jpg"
export const Welcome = () => {
  // const [isNew, setIsNew] = useState()
  const navigate = useNavigate()
  return (
    <section
    style={{background: `url(${backgroundImage}) center/cover`}}
     className="text-center flex flex-col items-center justify-center h-screen p-5 overflow-y-hidden text-white">
      <h1 className="text-6xl ">Atlas path</h1>
      <p className="mt-2 text-lg">
        Transform Your Travels into a Visual Journal: Log Cities, Dates, and
        Memories on Your personal World Map.
      </p>
      <div className="mt-20">
        <p>
          Please note that some of images you see are provided by a third-party
          service. They may not always be geographically accurate.
        </p>
      </div>
      <Button onClick={()=> navigate("/app")} styles="mt-5 font-semibold px-10 text-[1rem] rounded ">Start</Button>
    </section>
  );
};
