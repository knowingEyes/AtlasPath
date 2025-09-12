import { PEXELS_BASE_URL } from "../config/apiconfig";

export const PhotoAttribution = ({ PhotoGraperName, photoGrapherUrl }) => {
  if ((PhotoGraperName, photoGrapherUrl))
    return (
      <>
        <div className="absolute bottom-10 text-xs text-center w-full text-shadow-2xs italic">
          <p className="inline">Photo by</p>{" "}
          <a href={photoGrapherUrl} className="hover:underline active:underline">
            {PhotoGraperName}
          </a>{" "}
          on{" "}
          <a href={PEXELS_BASE_URL} className="hover:underline active:underline">
            pexels
          </a>
        </div>
      </>
    );
};
