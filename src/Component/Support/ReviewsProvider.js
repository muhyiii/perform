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
      <p className={`text-[${size ? size : 10}px]`}>{value} %</p>
    </CircularProgressbarWithChildren>
  );
};
export default ReviewsProvider;
