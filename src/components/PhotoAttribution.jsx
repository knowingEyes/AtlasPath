import { PEXELS_BASE_URL } from "../config/apiconfig";

export const PhotoAttribution = ({ PhotoGrapherName, photoGrapherUrl }) => {
  if (PhotoGrapherName && photoGrapherUrl)
    return (
      <div className="absolute bottom-10 text-xs text-center w-full text-shadow-2xs italic z-100 text-white">
        <p className="inline">Photo by</p>{" "}
        <a href={photoGrapherUrl} className="hover:underline active:underline">
          {PhotoGrapherName}
        </a>{" "}
        on{" "}
        <a href={PEXELS_BASE_URL} className="hover:underline active:underline">
          pexels
        </a>
      </div>
    );
};