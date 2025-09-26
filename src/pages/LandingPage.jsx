import backgroundImage from "../../public/masood-aslami-35vD8GskqlM-unsplash.jpg"
export const LandingPage = () => {
  return (
    <section className="h-screen w-full pt-20"
     style={{background: `url(${backgroundImage}) center/cover`}}
     >
        <h6 className=" text-7xl text-center font-bold text-white">Atlas path</h6>
    </section>
  )
}
