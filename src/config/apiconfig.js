const LOCATIONIQ_BASE_URL = "https://us1.locationiq.com/v1";
const WIKIPEDIA_BASE_URL = "https://en.wikipedia.org/api/rest_v1";
const locationIqApiToken = import.meta.env.VITE_LOCATIONIQ_TOKEN;
const pexelsApiToken = import.meta.env.VITE_PEXELS_TOKEN;
const PEXELS_BASE_URL = "https://api.pexels.com/v1";
const CB_API_TOKEN = import.meta.env.VITE_CB_TOKEN;
export {
  locationIqApiToken,
  pexelsApiToken,
  PEXELS_BASE_URL,
  LOCATIONIQ_BASE_URL,
  WIKIPEDIA_BASE_URL,
  CB_API_TOKEN
};
