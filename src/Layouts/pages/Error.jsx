import React from "react";
import { useNavigate } from "react-router";
import { Button } from "../../components/ui/button";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-center">
      <h1 className="text-9xl font-extrabold text-red-600 mb-6 select-none">
        404
      </h1>
      <h2 className="text-3xl font-semibold mb-4 text-gray-800">
        Oops! Page Not Found
      </h2>
      <p className="mb-6 max-w-md text-gray-600">
        The page you're looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Button
        size="md"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6"
        onClick={() => navigate("/")}
      >
        Go Back Home
      </Button>
    </div>
  );
};

export default Error;
