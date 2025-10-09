import { useSearchParams } from "react-router-dom";

export const useQueryString = () => {
  const [searchParam] = useSearchParams();
  const lat = searchParam.get("lat");
  const lon = searchParam.get("lon");
  return [lat, lon];
};
