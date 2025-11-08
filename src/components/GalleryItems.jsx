import { memo } from "react";

export const GalleryItems = memo(function GalleryItems({
  img,
  cityName,
  photoGrapher,
  photoGrapherUrl,
  handleSelectedImage,
}) {

  return (
    <li
      className="rounded-xl overflow-hidden shadow-md cursor-pointer"
      onClick={() => handleSelectedImage(img)}
    >
      <img
        src={img[0]}
        alt={cityName}
        className=" w-full max-h-40 h-50 block object-cover"
      />
      <div className="p-3 font-semibold">
        <h1>{cityName}</h1>
      </div>
    </li>
  );
});
