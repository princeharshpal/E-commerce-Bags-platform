import React from "react";
import { GoHeart } from "react-icons/go";
import { BsHandbag } from "react-icons/bs";
import { Link } from "react-router-dom";

const ProductCard = ({ _id, name, price, image }) => {
  return (
    <div className="w-full bg-gray-100 rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <div className="text-lg">
          <h3>{name}</h3>

          <p className="font-semibold">
            &#8377;{price.toLocaleString("en-IN")}
          </p>
        </div>

        <div className="flex gap-2 items-center text-lg">
          <span className="p-2 bg-white rounded-full cursor-pointer">
            <GoHeart />
          </span>
          <span className="p-2 bg-white rounded-full cursor-pointer">
            <BsHandbag />
          </span>
        </div>
      </div>

      <Link to={`/product/${_id}`}>
        <div className="w-full h-96 overflow-hidden p-10 bg-red-">
          <img
            className="object-cover object-center"
            src={image}
            alt="product image"
          />
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
