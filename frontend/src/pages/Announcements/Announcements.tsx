import Header from "../../components/Header";
import Announcement from "../../components/Announcement/Announcement";

const Announcements = () => {
  return (
    <>
      <Header />
      <div className="mt-20 p-10 flex flex-col items-center justify-center gap-4">
        <Announcement
          teacherName="Teacher 1"
          description="This is an Announcement"
          comments={[
            { studentName: "Ramal", comment: "This is a comment" },
            { studentName: "Ramal", comment: "This is a comment" },
          ]}
          createdAt="2023-05-05"
        />
        <Announcement
          teacherName="Teacher 1"
          description="This is an Announcement"
          comments={[
            { studentName: "Ramal", comment: "This is a comment" },
            { studentName: "Ramal", comment: "This is a comment" },
          ]}
          createdAt="2023-05-05"
        />
        <Announcement
          teacherName="Teacher 1"
          description="This is an Announcement"
          comments={[
            { studentName: "Ramal", comment: "This is a comment" },
            { studentName: "Ramal", comment: "This is a comment" },
          ]}
          createdAt="2023-05-05"
        />
      </div>
    </>
  );
};

export default Announcements;
