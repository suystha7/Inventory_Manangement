import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className="flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
      <button
        className="block lg:hidden text-black"
        onClick={() => setOpenSideMenu(!openSideMenu)}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>

      <h2 className="text-lg text-black font-medium">Expense Tracker</h2>

      {openSideMenu && (
        <div
          className="fixed top-[62px] -ml-4 bg-white  transition-opacity duration-300 ease-in-out transform scale-95 opacity-0"
          style={{
            transform: openSideMenu ? "scale(1)" : "scale(0.95)",
            opacity: openSideMenu ? 1 : 0,
          }}
        >
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
