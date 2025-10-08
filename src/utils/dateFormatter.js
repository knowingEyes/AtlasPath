export const dateFormatter = (data) => {
  const date = new Date(data);
  return date.toLocaleDateString("en", {
    year: "numeric",
    day: "numeric",
    month: "long",
  });
};

