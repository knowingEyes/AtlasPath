import { CountryFlag } from "./CountryFlag";
import { PhotoAttribution } from "./PhotoAttribution";

export const CountriesItems = ({
  img,
  photographer,
  photographerurl,
  flag
}) => {
  return (
    <li className="mb-4 overflow-hidden shadow-xl rounded-[20px]">
      <div
        className="relative w-full h-100 p-4"
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
