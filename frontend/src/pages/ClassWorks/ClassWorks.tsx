import { useState } from "react";
import ClassWork from "../../components/ClassWork/ClassWork";
import Header from "../../components/Header";

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

  return (
    <>
      <Header />
      <div className="mt-20 p-10 flex flex-col items-center justify-center gap-4">
        <ClassWork />
        <ClassWork />
        <ClassWork />
      </div>
    </>
  );
};

export default ClassWorks;
