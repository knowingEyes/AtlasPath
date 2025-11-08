import { useQuery } from "@tanstack/react-query";
import { PEXELS_BASE_URL } from "../config/apiconfig";

export const usePromiseFetch = (
  token = null,
  key,
  dataToFetch = [],
  enabled = true
) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [key],
    queryFn: async () => {
      const res = await Promise.all(
        dataToFetch.map((data) =>
          fetch(`${PEXELS_BASE_URL}/search?query=${data}`, {
            headers: {
              Authorization: token,
            },
          })
        )
      );
      if (res.ok) throw new Error("Failed to fetch");
      const data = Promise.all(res.map((res) => res.json()));
      return data;
    },
    enabled: enabled,
  });
  return { data, isLoading, error };
};
