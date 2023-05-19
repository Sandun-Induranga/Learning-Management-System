import Header from "../../components/Header";
import api from "../../api";
import { useEffect, useState } from "react";
import Result from "../../components/Result/Result";

type ResultDetail = {
  studentId: string;
  classWorkId: string;
  mark: number;
  grade: string;
  classWorkName: string;
  moduleName: string;
};

type ClassWorkDetail = {
  _id: string;
  name: string;
  description: string;
  type: string;
  dueDate: string;
  moduleName: string;
  file: string;
  batch: string;
};

const ResultsPage = () => {
  const [assingmentList, setAssignmentList] = useState<ResultDetail[]>([]);
  const [projectList, setProjectList] = useState<ResultDetail[]>([]);
  const [courseworkList, setCourseworkList] = useState<ResultDetail[]>([]);

  useEffect(() => {
    getResults();
  }, []);

  const getResults = () => {
    api
      .get(`result/${localStorage.getItem("currentStudentId")}`)
      .then((res) => {
        setAssignmentList(res.data.responseData.assignments);
        setProjectList(res.data.responseData.projects);
        setCourseworkList(res.data.responseData.courseworks);
      });
  };

  return (
    <>
      <Header />
      <section className="mt-20 w-full p-10 sm:px-60 flex flex-col gap-10">
        <h1 className="text-2xl text-slate-700">Assignments</h1>
        <aside className="flex flex-col gap-4">
          {assingmentList.map((result) => (
            <Result
              key={result.classWorkId}
              name={result.classWorkName}
              moduleName={result.moduleName}
              mark={result.mark}
              grade={result.grade}
            />
          ))}
        </aside>
        <h1 className="text-2xl text-slate-700">Projects</h1>
        {projectList.map((result) => (
          <aside className="flex flex-col gap-4">
            <Result
              key={result.classWorkId}
              name={result.classWorkName}
              moduleName={result.moduleName}
              mark={result.mark}
              grade={result.grade}
            />
          </aside>
        ))}
        <h1 className="text-2xl text-slate-700">Courseworks</h1>
        {courseworkList.map((result) => (
          <aside className="flex flex-col gap-4">
            <Result
              key={result.classWorkId}
              name={result.classWorkName}
              moduleName={result.moduleName}
              mark={result.mark}
              grade={result.grade}
            />
          </aside>
        ))}
      </section>
    </>
  );
};

export default ResultsPage;
