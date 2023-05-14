type ResultProps = {
  name: string;
  moduleName: string;
  mark: number;
  grade: string;
};

const Result = (props: ResultProps) => {
  return (
    <div>
      <h1>ClassWork : {props.name}</h1>
      <h1>Module Name : {props.moduleName}</h1>
      <h1>Marks : {props.mark}</h1>
      <h1>Grade : {props.grade}</h1>
    </div>
  );
};

export default Result;
