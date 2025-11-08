import { useCallback, useState } from "react";
import { GalleryItems } from "../components/GalleryItems";
import { GallerySkelton } from "../skeletons/GallerySkeleton";
import { PEXELS_BASE_URL, pexelsApiToken } from "../config/apiconfig";
import { usePromiseFetch } from "../hooks/usePromiseFetch";
import { getAttribution} from "../utils/getAttribution";
import { cities } from "../config/gallerycities";
import Lightbox from "yet-another-react-lightbox";

export const Gallery = () => {
  const [openLightBox, setOpenLightBox] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleSelectedImage = useCallback((photos) => {
    setOpenLightBox(true);
    setSelectedPhoto(photos.map((photos) => ({ src: photos })));
  }, []);

  const { data, isLoading } = usePromiseFetch(
    pexelsApiToken,
    "gallery",
    cities
  );

  // Create gallery images with attribution info
  const galleryImages = data?.reduce(
    (acc, photos) => (acc = getAttribution(acc, photos, 5)),
    []
  );

  if (isLoading) return <GallerySkelton />;

  return (
    <section className="max-w-[1024px] mx-auto">
      <ul className={`grid min-[1024px]:grid-cols-3 grid-cols-2 gap-3 pb-30`}>
        {galleryImages.map((items, i) => (
          <GalleryItems
            key={i}
            cityName={cities[i]}
            handleSelectedImage={handleSelectedImage}
            {...items}
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
