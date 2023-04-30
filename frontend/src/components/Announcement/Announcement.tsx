import userImage from "../../assets/avatar.jpg";
import { Avatar } from "@mui/material";
const Announcement = () => {
  return (
    <main className="md:w-1/2 border p-10 rounded-lg flex flex-col gap-6">
      <section className="flex gap-4">
        <Avatar className="border" src={userImage} />
        <div className="flex flex-col">
          <span className="text-gray-700">Teacher 1</span>
          <span className="text-xs text-gray-600">2023-04-30</span>
        </div>
      </section>
      <section className="text-gray-700">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti
        quibusdam labore libero vel sunt ut, hic quis magnam possimus voluptatem
        vero aliquam voluptatibus qui veritatis sint porro molestias saepe
        sapiente! Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Ratione perferendis eius, id minus autem commodi nesciunt nobis ex
        exercitationem velit minima dolores nostrum, quae mollitia vitae et
        corporis vero. Earum!
      </section>
    </main>
  );
};

export default Announcement;
