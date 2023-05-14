import Header from "../../components/Header";
import api from "../../api";
import { useState } from "react";

type ResultDetail = {
  studentId: string;
  classWorkId: string;
  mark: number;
  grade: string;
};

const ResultsPage = () => {
  const [resultList, setResultList] = useState<ResultDetail[]>([]);
  const getResults = () => {
    api.get("result").then((res) => {});
  };

  return (
    <>
      <Header />
      <section className="mt-20 p-10 sm:px-60">
        <h1>Assignments</h1>
        <h1>Courseworks</h1>
        <h1>Projects</h1>
      </section>
    </>
  );
};

export default ResultsPage;
