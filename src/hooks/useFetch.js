import { useEffect, useState } from "react";

export const useFetch = (
  url = null,
  token = null,
  type = "normal",
  dataToFetch = []
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!url) return;
    const fetchData = async () => {
      setIsLoading(true);
      try {

        /* Assign the fetchtype based on condition. hardcode the url if only type is promise */
        const fetchType =
          type === "normal" && token
            ? fetch(url, { headers: { Authorization: token } })
            : type === "promise" && token
            ? Promise.all(
                dataToFetch.map((data) =>
                  fetch(`${url}/search?query=${data}`, {
                    headers: { Authorization: token },
                  })
                )
              )
            : fetch(url);
 
        const res = await fetchType;
         
        /* Check if response is an array then loop to get access to the res .ok obeject
        and throw error if res is false for either mapped res or unmapped res*/
        if (Array.isArray(res)) {
          res.map((res) => {
            if (!res.ok) throw new Error(`Error bad request", ${res.status}`);
          });
        } else if (!res.ok) throw new Error("Error bad request", res.status);

         /*convert the response to json. if type is promise, 
          loop all promises of res and convert to json,  otherwise just convert*/
        const data =
          type === "normal"
            ? await res.json()
            : await Promise.all(res.map((res) => res.json()));
        setData(data);

      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url]);
  return { data, isLoading, error };
};

