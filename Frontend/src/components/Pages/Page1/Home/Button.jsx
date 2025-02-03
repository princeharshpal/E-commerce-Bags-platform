import React from "react";
import { GoArrowRight } from "react-icons/go";

const Button = ({ text }) => {
  return (
    <div className="px-4 py-2 border-2 text-xl flex items-center gap-2 rounded-full w-fit">
      {text}
      <GoArrowRight />
    </div>
  );
};

export default Button;
