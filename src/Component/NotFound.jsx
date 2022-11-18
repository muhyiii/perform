import React from "react";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="m-36  ">
      <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div class="md:flex place-items-center justify-center">
          <div class="md:shrink-0 ">
            <iframe
              src="https://giphy.com/embed/oZQnS19L33tLO"
              width="200"
              height="200"
              frameBorder="0"
              className="sm:w-full"
            ></iframe>
          </div>
          <div class="p-8">
            <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              Company retreats
            </div>
            <a
              href="#"
              class="block mt-1 text-lg leading-tight font-medium text-black hover:underline text-[30px] font-bold"
            >
              Something's Wrong here...
            </a>
            <p class="mt-2 text-slate-500">
            We Can't Find your Looking For, Check out our Help Center or head back to Login
            </p>
            <div className="pt-8 ">
              <button class="my-10 mr-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                <NavLink
                  to="Login"
                  className={({ isActive }) =>
                    isActive ? "text-2xl" : undefined
                  }
                >
                  Login
                </NavLink>
              </button>
              {/* <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              Home
            </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
