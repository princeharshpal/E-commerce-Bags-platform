import React from "react";
import { HiOutlineMenu } from "react-icons/hi";
import Icon from "./components/Icon";
import { FaRegHeart } from "react-icons/fa";
import { BsBag } from "react-icons/bs";
import { IoBag } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";

const Header = () => {
  const icons = [<FaRegHeart />, <BsBag />, <FaRegUser />];

  return (
    <nav className="w-full p-4 flex items-center justify-between">
      <Icon icon={<HiOutlineMenu />} />

      <div className="text-2xl font-semibold flex items-center">
        <span className="mt-[1px]">
          <IoBag />
        </span>
        Bags.
      </div>

      <div className="flex items-center gap-2">
        {icons.map((icon, idx) => (
          <Icon key={idx} icon={icon} />
        ))}
      </div>
    </nav>
  );
};

export default Header;
