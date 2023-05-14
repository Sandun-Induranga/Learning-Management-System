import Header from "../../components/Header";
import api from "../../api";
import { useEffect, useState } from "react";
import Result from "../../components/Result/Result";

type ResultDetail = {
  studentId: string;
  classWorkId: string;
  mark: number;
  grade: string;
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
  const [resultList, setResultList] = useState<ResultDetail[]>([]);
  const [classWork, setClassWork] = useState<ClassWorkDetail>();

  useEffect(() => {
    getResults();
  }, []);

  const getResults = () => {
    api.get("result").then((res) => {
      setResultList(res.data.responseData);
    });
  };

  const getClassWorkById = (classWorkId: string) => {
    api.get(`classwork/${classWorkId}`).then((res) => {
      setClassWork(res.data.responseData);
    });
  };

  return (
    <>
      <Header />
      <section className="mt-20 p-10 sm:px-60">
        <h1 className="text-2xl text-slate-700">Assignments</h1>
        {resultList.map((result) => (
          <>
            {getClassWorkById(result.classWorkId)}
            {classWork?.type == "Assignment" ? (
              <>
                <Result
                  key={result.classWorkId}
                  name={classWork.name}
                  moduleName={classWork.moduleName}
                  mark={result.mark}
                  grade={result.grade}
                />
              </>
            ) : (
              <></>
            )}
          </>
        ))}
        <h1 className="text-2xl text-slate-700">Assignments</h1>
        {resultList.map((result) => (
          <>
            {getClassWorkById(result.classWorkId)}
            {classWork?.type == "Project" ? (
              <>
                <Result
                  key={result.classWorkId}
                  name={classWork.name}
                  moduleName={classWork.moduleName}
                  mark={result.mark}
                  grade={result.grade}
                />
              </>
            ) : (
              <></>
            )}
          </>
        ))}
      </section>
    </>
  );
};

export default ResultsPage;
