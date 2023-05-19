type ResultProps = {
  name: string;
  moduleName: string;
  mark: number;
  grade: string;
};

const Result = (props: ResultProps) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 p-10 border rounded-lg shadow-lg text-lg text-gray-700 w-1/2">
      <div>
        <h1>
          ClassWork : <span>{props.name}</span>
        </h1>
        <h1>
          Module Name : <span>{props.moduleName}</span>
        </h1>
        <h1>
          Marks : <span>{props.mark}</span>
        </h1>
        <h1>
          Grade : <span className="text-red-700">{props.grade}</span>
        </h1>
      </div>
    </div>
  );
};

export default Result;
