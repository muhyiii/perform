import React from "react";
import { useDispatch } from "react-redux";

const Alert = ({ isAlert, description, type }) => {
  const dispatch = useDispatch();

  const isTrue = type === "Success" ? true : false;

  if (!isAlert) return null;
  return (
    <div className="absolute right-0 z-50">
      <div className="max-w-lg overflow-hidden rounded-lg bg-green-100 text-green-700 shadow-md shadow-green-500/20">
        <div className="flex">
          <div className="flex items-center gap-4 p-4">
            <div className="shrink-0">
              <svg width="32" height="32" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M20 16v-6h2v6a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2h8v2H8v12h12m-9.09-8.92L14 10.17l6.59-6.59L22 5l-8 8l-4.5-4.5l1.41-1.42M16 20v2H4a2 2 0 0 1-2-2V7h2v13h12Z"
                ></path>
              </svg>
            </div>
            <div className="space-y-1">
              <p className="font-bold capitalize">Success Title goes Here</p>
              <p className="text-sm">{description}</p>
            </div>
          </div>
          <div className="flex cursor-pointer items-center border-l border-green-200 px-5 hover:bg-green-200">
            <button
              className=""
              onClick={() => dispatch({ type: "STOP_ALERT" })}
            >
              <svg width="28" height="28" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;
