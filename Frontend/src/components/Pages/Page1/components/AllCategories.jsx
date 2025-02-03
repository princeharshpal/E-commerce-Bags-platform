import React from "react";
import Category from "./Category";
import { RiSearchLine } from "react-icons/ri";

const AllCategories = () => {
  const categories = [
    "Men",
    "Women",
    "Children",
    "Brand",
    "New",
    "Popular",
    "About",
    "FAQ's",
  ];
  return (
    <div className="w-full flex gap-3 my-3">
      {categories.map((category, idx) => {
        return <Category key={idx} category={category} />;
      })}

      <div className="w-full flex items-center justify-between rounded-2xl px-6 py-3 text-xl font-thin bg-gray-100 hover:bg-gray-200">
        <input
          type="text"
          placeholder="Search..."
          className="focus:outline-none"
        />
        <span className="p-2 bg-white rounded-full cursor-pointer">
          <RiSearchLine />
        </span>
      </div>
    </div>
  );
};

export default AllCategories;
