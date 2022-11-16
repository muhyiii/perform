import React from "react";
import { NavLink} from "react-router-dom";

const NotFound = () => {
  return (
    <div className="bg-auto bg-no-repeat bg-center max-w-md mx-auto sm:grid-rows-2 place-content-center m-36 bg-white rounded-xl shadow-md  md:max-w-xl ">
      <div className="grid grid-cols-2  place-items-center  ">
        <figure class="bg-gray-200 xl:rounded-l-lg xl:rounded-t-none md:rounded-l-lg md:rounded-t-xl p-8 md:p-5 dark:bg-gray-800 overflow-hidden">
          <h3 className="text-[30px] font-bold">Something's Wrong here...</h3>
          <p className="text-xl">We Can't Find your Looking For</p>
          <p className="text-xl">
            Check out our Help Center or head back to Login
          </p>
          <div className="pt-8 ">
            <button class="my-10 mr-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
            <NavLink
                  to="Login"
                  className={({ isActive }) =>
                    isActive ? "text-2xl" : undefined
                  }
                >
                  Dashboard
                </NavLink>
            </button>
            {/* <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              Home
            </button> */}
          </div>
        </figure>
        <iframe
          src="https://giphy.com/embed/oZQnS19L33tLO"
          width="200"
          height="200"
          frameBorder="0"
          className=""
        ></iframe>
      </div>
    </div>
  );
};

export default NotFound;
