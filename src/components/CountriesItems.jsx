import { CountryFlag } from "./CountryFlag";
import { PhotoAttribution } from "./PhotoAttribution";

export const CountriesItems = ({
  img,
  photographer,
  photographerurl,
  flag
}) => {
  return (
    <li className="mb-4">
      <div
        className="relative w-full  h-100 rounded-[20px] p-4 overflow-hidden shadow-xl"
        style={{ background: `url(${img}) center/cover ` }}
      >
        <PhotoAttribution
          photoGrapherUrl={photographerurl}
          PhotoGraperName={photographer}
        />
        <CountryFlag src={flag}/>
      </div>
    </li>
  );
};
