import Header from "../../components/Header";
import Announcement from "../../components/Announcement/Announcement";
import api from "../../api";
import { ChangeEvent, useEffect, useState } from "react";
import { AddCircle, DoDisturbOn } from "@mui/icons-material";
import { Button, TextField, ThemeProvider, createTheme } from "@mui/material";

type Comment = {
  studentName: string;
  comment: string;
};

type AnnouncementDetail = {
  teacherName: string;
  description: string;
  createdAt: string;
  comments: Comment[];
  batch: string;
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffb703",
    },
  },
});

const Announcements = () => {
  const [announcementList, setAnnouncementList] = useState<
    AnnouncementDetail[]
  >([]);
  const [isClickedAddButton, setIsClickedAddButton] = useState<boolean>(true);
  const [isTeacher, setIsTeacher] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    getAllAnnouncements();
  }, []);

  const bindAddAndDiscartEvent = () => {
    setIsClickedAddButton(!isClickedAddButton);
  };

  const getAllAnnouncements = () => {
    if (localStorage.getItem("currentRole") == "Student") {
      setIsTeacher(true);
      api
        .get(`student/current/${localStorage.getItem("currentUsername")}`)
        .then((res) => {
          localStorage.setItem(
            "currentStudent",
            res.data.responseData.studentName
          );
          localStorage.setItem("currentStudentId", res.data.responseData._id);
          localStorage.setItem(
            "profilePhoto",
            res.data.responseData.profilePhoto
          );
          localStorage.setItem("currentBatch", res.data.responseData.batchName);
          api
            .get(`announcement/${res.data.responseData.batchName}`)
            .then((res) => {
              setAnnouncementList(res.data.responseData);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setIsTeacher(true);

      api
        .get(`teacher/current/${localStorage.getItem("currentUsername")}`)
        .then((res) => {
          localStorage.setItem(
            "currentTeacher",
            res.data.responseData.teacherName
          );

          api
            .get(`announcement/${localStorage.getItem("currentBatch")}`)
            .then((res) => {
              setAnnouncementList(res.data.responseData);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name == "batchName") {
      setDescription(value);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let newAnnouncement = {
      teacherName: localStorage.getItem("currentTeacher"),
      description: description,
      batch: localStorage.getItem("currentBatch"),
      comments: [],
    };

    api
      .post("announcement", newAnnouncement)
      .then((res) => {
        console.log(res);
        getAllAnnouncements();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Header />
      <div className="mt-20 lg:mx-60 p-10 flex flex-col items-center justify-center gap-4">
        {isTeacher ? (
          <>
            {!isClickedAddButton ? (
              <>
                <section
                  className="w-full h-12 rounded-t-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white flex justify-between items-center cursor-pointer px-20"
                  onClick={bindAddAndDiscartEvent}
                >
                  <p>Add New Announcement</p>
                  <span>
                    <AddCircle />
                  </span>
                </section>
                <section
                  className="w-full h-32 border rounded-b-lg text-xl flex flex-col justify-center items-center text-gray-700 cursor-pointer"
                  onClick={bindAddAndDiscartEvent}
                >
                  <AddCircle />
                  Add New Batch
                </section>
              </>
            ) : (
              <>
                <section
                  className="w-full h-12 rounded-t-lg bg-sky-edited-500 text-white flex justify-between items-center cursor-pointer px-20"
                  onClick={bindAddAndDiscartEvent}
                >
                  <p>Discart Announcement</p>
                  <span>
                    <DoDisturbOn />
                  </span>
                </section>
                <section className="w-full border rounded-b-lg text-xl flex flex-col justify-center items-center text-gray-700 sm:p-10 p-5">
                  <form className="w-ful" onSubmit={handleSubmit}>
                    <ThemeProvider theme={theme}>
                      <TextField
                        label="Description"
                        fullWidth
                        color="primary"
                        name="batchName"
                        multiline
                        rows={4}
                        value={description}
                        onChange={handleInputChange}
                        placeholder="Enter Batch Name"
                        required
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        className="!mt-5"
                      >
                        Save Announcement
                      </Button>
                    </ThemeProvider>
                  </form>
                </section>
              </>
            )}
          </>
        ) : (
          <></>
        )}

        {announcementList.map((announcement) => (
          <Announcement
            teacherName={announcement.teacherName}
            description={announcement.description}
            comments={announcement.comments}
            createdAt={announcement.createdAt}
            batch={announcement.batch}
          />
        ))}
      </div>
    </>
  );
};

export default Announcements;
