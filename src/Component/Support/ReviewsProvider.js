import React from "react";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
 
const ReviewsProvider = ({ valueStart, valueEnd, size }) => {
  const [value, setValue] = React.useState(valueStart);
 
  React.useEffect(() => {
    setValue(valueEnd);
  }, [valueEnd]);
 
  return (
    <CircularProgressbarWithChildren
      value={value}
      strokeWidth={18}
      styles={buildStyles({
        rotation: 0.25,
        strokeLinecap: "butt",
        pathTransitionDuration: 0.5,
        pathColor: `rgba(${value / 100}, 152, 199 ,${value / 100})`,
        trailColor: "#d6d6d6",
        backgroundColor: "#3e98c7",
      })}
    >
      {size ? (
        <p className={`text-[${size}px] text-sm font-semibold text-gray-600 text-center`}>{value} %</p>
      ) : (
        <p className={`text-[10px] text-sm font-semibold text-gray-600 text-center`}>{value} %</p>
      )}
    </CircularProgressbarWithChildren>
  );
};
 
export const BarProv = ({ valueStart, valueEnd, }) => {
  const [style, setStyle] = React.useState(valueStart);
  React.useEffect(() => {
    setStyle(valueEnd);
  }, [valueEnd]);
 
  return (
    <div
    className="p-3 progress h-15  "
    >
     
       <p style={{width: `${valueEnd}%`,}} className="text-sm font-semibold text-gray-600 text-center">
       {valueEnd}%
        </p>
      <div
        className="progress-done rounded-lg shadow-in py-2"
        style={{
          rotation: 0.25,
        trailColor: "#d6d6d6",
        backgroundColor: "#3e98c7",
          width: `${valueEnd}%`,
          transition:"width 0.5s"
        }}
      >
       
      </div>
    </div>
  );
};
 
export default ReviewsProvider;
 

