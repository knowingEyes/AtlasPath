import { useCallback, useEffect, useRef, useState } from "react";
import { GalleryItems } from "../components/GalleryItems";
import { GallerySkelton } from "../skeletons/GallerySkeleton";
import { PEXELS_BASE_URL, pexelsApiToken } from "../config/apiconfig";
import { useFetch } from "../hooks/useFetch";
import { getAttrribution } from "../utils/getAttribution";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { cities } from "../config/gallerycities";
import Lightbox from "yet-another-react-lightbox";

export const Gallery = () => {
  const [openLightBox, setOpenLightBox] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  
  const handleSelectedImage = useCallback((photos) => {
    setOpenLightBox(true);
    setSelectedPhoto(photos.map((photos) => ({ src: photos })));
  }, []);
  const [galleryImages, setGalleryImages] = useLocalStorageState(
    [],
    "galleryImage"
  );
  const previousCitiesLength = useRef(cities.length);
  const shouldFetch =
    previousCitiesLength.current > galleryImages.length ||
    previousCitiesLength.current < galleryImages.length;

  const { data, isLoading } = useFetch(
    shouldFetch && PEXELS_BASE_URL,
    pexelsApiToken,
    "promise",
    cities
  );

  useEffect(() => {
    if (!data) return;

    // create the image atttribution object
    const imgSrcAndAtrribute = data.reduce(
      (acc, photos) => (acc = getAttrribution(acc, photos, 5)),
      []
    );
    setGalleryImages(imgSrcAndAtrribute);
  }, [data]);
  if (isLoading) return <GallerySkelton />;

  return (
    <section className="max-w-[1024px] mx-auto">
      <ul className={`grid min-[1024px]:grid-cols-3 grid-cols-2 gap-3 pb-30`}>
        {galleryImages.map(({ img, photographer_url, photographer }, i) => (
          
            <GalleryItems
              key={i}
              cityName={cities[i]}
              imgUrl={img}
              photoGrapherUrl={photographer_url}
              photoGrapher={photographer}
              handleSelectedImgage={handleSelectedImage}
            /> 
          
        ))}
      </ul>{" "}
      <Lightbox
        open={openLightBox}
        close={() => {
          setSelectedPhoto(null);
          setOpenLightBox(false);
        }}
        slides={selectedPhoto}
      />
    </section>
  );
};
