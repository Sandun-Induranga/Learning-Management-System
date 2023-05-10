import { useEffect, useState } from "react";
import ClassWork from "../../components/ClassWork/ClassWork";
import Header from "../../components/Header";
import api from "../../api";

type ClassWorkDetail = {
  _id: string;
  name: string;
  type: string;
  dueDate: Date;
  moduleName: string;
  file: string;
  batch: string;
};

const ClassWorks = () => {
  const [classWorkList, setClassWorkList] = useState<ClassWorkDetail[]>([]);

  useEffect(() => {
    getAllClassWorks();
  }, []);

  const getAllClassWorks = () => {
    api
      .get("classwork")
      .then((res) => {
        setClassWorkList(res.data.responseData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Header />
      <div className="mt-20 p-10 flex flex-col items-center justify-center gap-4">
        {classWorkList.map((classWork) => (
          <ClassWork
            _id=""
            name=""
            dueDate={new Date()}
            batch=""
            moduleName=""
            type=""
            file=""
          />
        ))}
      </div>
    </>
  );
};

export default ClassWorks;
