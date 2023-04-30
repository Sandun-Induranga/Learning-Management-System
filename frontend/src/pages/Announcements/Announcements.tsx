import Header from "../../components/Header";
import Announcement from "../../components/Announcement/Announcement";

const Announcements = () => {
  return (
    <>
      <Header />
      <div className="mt-20 p-10 flex justify-center">
        <Announcement />
      </div>
    </>
  );
};

export default Announcements;
