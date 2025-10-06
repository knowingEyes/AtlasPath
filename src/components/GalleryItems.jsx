
export const GalleryItems = ({ imgUrl, cityName, photoGrapher, photoGrapherUrl }) => {
  return (
    <li className="rounded-xl overflow-hidden shadow-md">
      <img  src={imgUrl} alt={cityName} className=" w-full max-h-40 h-50 block object-cover"/>
      <div className="p-3 font-semibold"><h1>{cityName}</h1></div>
    </li>
    
  );
};
