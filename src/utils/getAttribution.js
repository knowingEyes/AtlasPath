export const getAttrribution = (acc, { photos } = {}, max = 1, options) => {
  const mutiple = max > 1;
  const mutiplePhotos = photos
    .slice(1, max)
    .map(({ src }) => src.original);
  return (acc = [
    ...acc,
    {
      img: mutiple ? mutiplePhotos : photos[0].src.original,
      photographer_url: photos[0].photographer_url,
      photographer: photos[0].photographer,
      ...options,
    },
  ]);
};
