import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout";
import Home from "./components/Pages/Page1/Home/Home";
import Faq from "./components/FAQ's/Faq";
import ShowProduct from "./components/Pages/Page1/Home/ShowProduct";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="faq" element={<Faq />} />
      <Route path="product/:id" element={<ShowProduct />} />
    </Route>
  )
);

export default router;
