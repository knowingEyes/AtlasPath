export const getAttribution = (preValue, { photos } = {}, max = 1, ...options) => {
  const more = new Object(...options);
  const mutiple = max > 1;
  const mutiplePhotos = photos.slice(1, max).map(({ src }) => src.original);

  return [
    ...preValue,
    {
      img: mutiple ? mutiplePhotos : photos[0].src.original,
      photographer_url: photos[0].photographer_url,
      photographer: photos[0].photographer,
      ...more,
    },
  ];
};
