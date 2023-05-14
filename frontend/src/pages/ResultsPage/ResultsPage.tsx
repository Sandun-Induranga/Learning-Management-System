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
  const [classWork, setClassWork] = useState<ClassWorkDetail>();

  useEffect(() => {
    getResults();
  }, []);

  const getResults = () => {
    api.get("result").then((res) => {
      setAssignmentList(res.data.responseData.assignments);
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
      </section>
    </>
  );
};

export default ResultsPage;
