import React from "react";
import AllCategories from "../components/AllCategories";
import Section1 from "./Section1";
import Section2 from "./AllProducts";
import AllProducts from "./AllProducts";

const Home = () => {
  return (
    <div>
      <AllCategories />
      <Section1 />
      <AllProducts />
    </div>
  );
};

export default Home;
