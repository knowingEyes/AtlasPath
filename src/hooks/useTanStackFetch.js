import { useQuery } from "@tanstack/react-query";

export const useTanStackFetch = (url, key, enabled = true, token = null) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [key],
    gcTime: 0,
    queryFn: async () => {
      let endpoint;
      if (token) {
        endpoint = await fetch(url, {
          headers: { Authorization: token },
        });
      } else {
        endpoint = await fetch(url);
      }

      const data = await endpoint.json();
      if (!endpoint.ok) throw new Error(data.message || "Error fetching data");
      return data;
    },
    enabled: Boolean(enabled),
  });
  return { data, isLoading, error };
};
