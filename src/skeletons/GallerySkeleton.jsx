import { cities } from "../config/gallerycities";

export const GallerySkelton = () => {
  return (
    <div className="max-w-[1024px] mx-auto">
      <ul className={`grid min-[1024px]:grid-cols-3 grid-cols-2 gap-3`}>
        {Array.from({ length: cities.length }).map((_, i) => (
          <li key={i} className="rounded-xl overflow-hidden block shadow-md max-h-40 h-50 bg-gray-700/60 animate-pulse   "></li>
        ))}
      </ul>
    </div>
  );
};
