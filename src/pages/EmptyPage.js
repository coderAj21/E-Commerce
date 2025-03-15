import React from "react";
import { NavLink } from "react-router-dom";
import { routes } from "../config/routes";
import { Button } from "rizzui";

const EmptyPage = ({ head1, head2 }) => {
  return (
    <div className="w-full min-h-[calc(100vh-200px)] flex flex-col items-center justify-center ">
      <p className="text-3xl sm:text-4xl font-semibold my-2 tracking-wide font-serif">
        {head1}
      </p>
      <p className="text-xl">{head2}</p>
      <NavLink to={routes.home.listing}>
        <Button
          variant="outline"
          className="rounded-md bg-yellow-300 text-black font-semibold p-2 px-8
                 hover:bg-yellow-400 transition duration-150 ease-in my-2 text-xl"
        >
          Start Shopping
        </Button>
      </NavLink>
    </div>
  );
};

export default EmptyPage;
