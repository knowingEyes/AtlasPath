
export const GalleryItems = ({ imgUrl, cityName, photoGrapher, photoGrapherUrl, handleSelectedImgage }) => {
  return (
    <li className="rounded-xl overflow-hidden shadow-md cursor-pointer" onClick={()=> handleSelectedImgage(imgUrl)}>
      <img  src={imgUrl[0]} alt={cityName} className=" w-full max-h-40 h-50 block object-cover"/>
      <div className="p-3 font-semibold"><h1>{cityName}</h1></div>
    </li>
    
  );
};

