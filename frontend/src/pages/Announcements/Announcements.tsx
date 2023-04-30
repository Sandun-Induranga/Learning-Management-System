import Header from "../../components/Header";
import Announcement from "../../components/Announcement/Announcement";

const Announcements = () => {
  return (
    <>
      <Header />
      <div className="mt-20 p-10 flex flex-col items-center justify-center gap-4">
        <Announcement />
        <Announcement />
        <Announcement />
      </div>
    </>
  );
};

export default Announcements;
