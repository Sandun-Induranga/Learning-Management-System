import mainImage from "../../assets/main-page-image.jpg";

const Home = () => {
  return (
    <>
      <header className="w-full h-28 bg-black fixed"></header>
      <main className="w-full h-screen">
        <section className="flex h-full">
          <div className="w-1/3 h-full flex flex-col gap-y-10 justify-center pl-20">
            <h1 className="text-7xl text-sky-edited-500 font-bold">
              ONLINE LEARNING
            </h1>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
              voluptates a vitae! Asperiores saepe culpa dolorum quod aliquam
              eveniet odit delectus maxime libero animi, doloribus doloremque?
              Eaque nisi fugiat quisquam?
            </p>
            <button className="px-12 py-4 bg-sky-edited-500 text-lg text-white rounded-full w-max font-semibold">
              LOGIN
            </button>
          </div>
          <div className="w-2/3 h-full flex justify-center items-end">
            <img src={mainImage} className="w-11/12" alt="" />
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
