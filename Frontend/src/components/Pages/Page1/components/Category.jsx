import React from "react";

const Category = ({ category }) => {
  return (
    <span className="cursor-pointer rounded-2xl px-6 py-3 text-xl font-thin bg-gray-100 hover:bg-gray-200">
      {category}
    </span>
  );
};

export default Category;
