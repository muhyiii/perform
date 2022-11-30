import React from "react";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";

const ReviewsProvider = ({ valueStart, valueEnd, children }) => {
  const [value, setValue] = React.useState(valueStart);
  React.useEffect(() => {
    setTimeout(() => {
      setValue(valueEnd);
    }, 50);
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
      <p className="text-[10px]">{value}%</p>
    </CircularProgressbarWithChildren>
  );
};
export default ReviewsProvider;
