import { useModelStore } from "@/app/(cursor)/model";

const ResultsDebug: React.FC = () => {
  const results = useModelStore((s) => s.results);

  return (
    <div className="fixed right-0 top-0 flex h-28 w-96 flex-wrap text-white">
      <div className="flex h-1/2 w-full flex-row bg-red-500">
        {results?.handedness.map((hand, index) => (
          <div key={hand[0].categoryName} className="flex w-1/2 flex-col">
            <div>{hand[0].categoryName}</div>
            <div>{hand[0].score}</div>
          </div>
        ))}
      </div>
      <div className="h-1/2 w-1/3 bg-green-500">
        {results?.landmarks.map((landmark, index) => (
          <div key={index} className="flex flex-col">
            <div>{landmark[index].x}</div>
          </div>
        ))}
      </div>
      <div className="h-1/2 w-1/3 bg-blue-500">
        {results?.landmarks.map((landmark, index) => (
          <div key={index} className="flex flex-col">
            <div>{landmark[index].y}</div>
          </div>
        ))}
      </div>
      <div className="h-1/2 w-1/3 bg-yellow-500">
        {results?.landmarks.map((landmark, index) => (
          <div key={index} className="flex flex-col">
            <div>{landmark[index].z}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsDebug;
