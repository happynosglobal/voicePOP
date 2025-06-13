import React from "react";
import useSidebar from "./hooks/useSidebar";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { menu, handleNavigation, location } = useSidebar();
  return (
    <aside
      className="wide:w-[210px] w-[160px] bg-[#484c56] wide:fixed absolute top-[60px] left-0 bottom-0 wide:h-full custom:z-10"
      style={{ height: "calc(100% - 60px)" }}
    >
      <nav className="min:px-6 px-4 pt-8 pb-20 h-full overflow-y-auto">
        <ul className="flex flex-col gap-5 text-white">
          {menu.map((group, index) => (
            <li key={group.code || index}>
              <h2 className="flex items-center gap-2 font-semibold text-lg mb-1">
                <img src={group.icon} alt="" className="w-7 h-7 object-cover" />
                {group.name}
              </h2>
              <ul className="w-full">
                {(group.children || []).map((item) => (
                  <li key={item.code} className="w-full">
                    <button
                      onClick={() =>
                        handleNavigation(item.url, item.type, item.name)
                      }
                      className={`block w-full text-left pl-8 py-2.5 rounded-[5px] leading-none cursor-pointer ${
                        location.pathname === item.url
                          ? "bg-accent font-medium text-black"
                          : "hover:bg-gray-700"
                      }`}
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}         
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
