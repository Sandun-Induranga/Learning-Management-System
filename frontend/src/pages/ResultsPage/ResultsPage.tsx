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
    api.get(`result${localStorage.getItem("currentStudentId")}`).then((res) => {
      setAssignmentList(res.data.responseData.assignments);
      setProjectList(res.data.responseData.projects);
      setCourseworkList(res.data.responseData.courseworks);
    });
  };

  return (
    <>
      <Header />
      <section className="mt-20 p-10 sm:px-60">
        <h1 className="text-2xl text-slate-700">Assignments</h1>
        {assingmentList.map((result) => (
          <>
            <Result
              key={result.classWorkId}
              name={result.classWorkName}
              moduleName={result.moduleName}
              mark={result.mark}
              grade={result.grade}
            />
          </>
        ))}
        <h1 className="text-2xl text-slate-700">Projects</h1>
        {projectList.map((result) => (
          <>
            <Result
              key={result.classWorkId}
              name={result.classWorkName}
              moduleName={result.moduleName}
              mark={result.mark}
              grade={result.grade}
            />
          </>
        ))}
        <h1 className="text-2xl text-slate-700">Courseworks</h1>
        {courseworkList.map((result) => (
          <>
            <Result
              key={result.classWorkId}
              name={result.classWorkName}
              moduleName={result.moduleName}
              mark={result.mark}
              grade={result.grade}
            />
          </>
        ))}
      </section>
    </>
  );
};

export default ResultsPage;
