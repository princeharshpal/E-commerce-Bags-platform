import React from "react";

const Icon = ({ icon }) => {
  return (
    <span className="w-fit h-fit p-2 text-xl rounded-full border-2 border-gray-300">
      {icon}
    </span>
  );
};

export default Icon;
