import { Add, PictureAsPdf, Send } from "@mui/icons-material";
import { Avatar, TextField } from "@mui/material";
import userImage from "../../assets/avatar.jpg";

const ClassWork = () => {
  return (
    <main className="md:w-1/2 border p-10 rounded-lg flex flex-col items-center gap-6">
      <div className="flex flex-col items-center">
        <span className="text-gray-700 text-lg font-semibold">
          Programming Fundamentals
        </span>
        <span className="text-gray-700">Assingment 01</span>
        <span className="text-xs text-gray-600">Due 2023-05-01</span>
      </div>

      <section className="text-gray-700 text-center">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti
        quibusdam labore libero vel sunt ut, hic quis magnam possimus voluptatem
        vero aliquam voluptatibus qui veritatis sint porro molestias saepe
        sapiente! Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Ratione perferendis eius, id minus autem commodi nesciunt nobis ex
        exercitationem velit minima dolores nostrum, quae mollitia vitae et
        corporis vero. Earum!
      </section>

      <section className="grid grid-cols-2 gap-6 mb-10">
        <a
          href="https://drive.google.com/viewerng/viewer?embedded=true&url=http://infolab.stanford.edu/pub/papers/google.pdf#toolbar=0&scrollbar=0"
          className="bg-sky-edited-500 px-6 py-2 rounded-full text-white"
        >
          <PictureAsPdf /> Document
        </a>
        <a
          href="https://drive.google.com/viewerng/viewer?embedded=true&url=http://infolab.stanford.edu/pub/papers/google.pdf#toolbar=0&scrollbar=0"
          className="bg-sky-edited-500 px-6 py-2 rounded-full text-white"
        >
          <PictureAsPdf /> Document
        </a>
      </section>
      <h6 className="text-gray-700">Submission Status : Pending</h6>
      <aside className="w-full border p-6 rounded-lg flex flex-col items-center gap-4">
        <p className="text-gray-700 font-semibold">Submit Your Work</p>
        <section className="w-40 h-40 border rounded-lg flex justify-center relative">
          <input
            className="opacity-0 cursor-pointer w-full h-full z-10"
            type="file"
          />
          <Add className="text-gray-200 !text-8xl absolute top-0 bottom-0 left-0 right-0 m-auto" />
        </section>
        <button className="px-6 py-2 bg-sky-edited-500 text-white rounded-lg w-max">
          Submit
        </button>
      </aside>
    </main>
  );
};

export default ClassWork;
