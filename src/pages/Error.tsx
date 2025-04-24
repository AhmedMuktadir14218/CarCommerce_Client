import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-5">
      <h1 className="text-7xl font-bold">Error 404</h1>
      <p>
        Go back to{" "}
        <Link className="text-blue-600 underline" to="/">
          Home
        </Link>
      </p>
    </div>
  );
};

export default Error;
