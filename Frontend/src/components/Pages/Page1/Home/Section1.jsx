import React from "react";
import { GoArrowDownRight } from "react-icons/go";
import Button from "./Button";

const Section1 = () => {
  const headings = ["Best Leather Bag", "Collection For You"];
  return (
    <div className='p-10 w-full h-[77vh] rounded-3xl bg-cover flex flex-col justify-between bg-center bg-[url("/Images/LandingPhoto.jpg")]'>
      <div>
        {headings.map((heading, idx) => {
          return (
            <h1
              key={idx}
              className={`text-7xl font-semibold tracking-tight ${
                idx == 0 && "ml-40"
              }`}
            >
              {heading}
            </h1>
          );
        })}
      </div>

      <div className="flex flex-col justify-between gap-5 bg-gray-100/60 w-fit p-6 rounded-3xl">
        <p className="flex items-center text-lg gap-2">
          <span className="text-xl">
            <GoArrowDownRight />
          </span>
          Discover the epitome of style and craftsmanship with our curated
          leather bag collection.
        </p>
        <Button text={"Start shopping"} />
      </div>
    </div>
  );
};

export default Section1;
