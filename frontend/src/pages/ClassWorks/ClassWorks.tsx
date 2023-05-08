import ClassWork from "../../components/ClassWork/ClassWork";
import Header from "../../components/Header";

const ClassWorks = (props: any) => {
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
