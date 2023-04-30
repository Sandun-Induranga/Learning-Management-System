import mainImage from "../../assets/main-page-image.jpg";

const Home = () => {
  return (
    <>
      <header className="w-full h-28 bg-black"></header>
      <main className="w-full h-screen">
        <section className="flex">
          <div className="w-1/3 h-full">ONLINE LEARNING</div>
          <div className="w-2/3 h-full">
            <img src={mainImage} alt="" />
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
