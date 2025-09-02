import { CitiesItems } from "./CitiesItems";

export const Cities = () => {
  return (
    <section className="  mt-5">
      <ul className="max-w-[500px] mx-auto">
        {Array.from({ length: 1 }).map((c) => (
          <CitiesItems />
        ))}
      </ul>
    </section>
  );
};
