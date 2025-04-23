import React, { useState } from "react";
import useSidebar from "./hooks/useSidebar";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { FiExternalLink } from "react-icons/fi";

const Sidebar = () => {
  const { menu, handleNavigation, location } = useSidebar();
  const [activeMenuIndex, setActiveMenuIndex] = useState(null);

  const toggleMenu = (menuIndex) => {
    setActiveMenuIndex(activeMenuIndex === menuIndex ? null : menuIndex);
  };
  return (
    <aside
      className="wide:w-[210px] w-[160px] bg-[#484c56] wide:fixed absolute top-[60px] left-0 bottom-0 wide:h-full custom:z-10"
      style={{ height: "calc(100% - 60px)" }}
    >
      <nav className="min:px-6 px-4 pt-8 pb-20 h-full overflow-y-auto">
        <ul className="flex flex-col gap-5 text-white">
          {menu.map((group, index) => (
            <li key={index}>
              <h2
                className="flex items-center gap-2 font-semibold text-lg mb-1 cursor-pointer"
                onClick={() => toggleMenu(index)}
              >
                <img src={group.icon} alt="" className="w-6 h-6 object-cover" />
                <span className="flex-1">{group.name}</span>
                {activeMenuIndex === index ? (
                  <IoIosArrowDown className="w-4 h-4" />
                ) : (
                  <IoIosArrowForward className="w-4 h-4" />
                )}
              </h2>
              <div
                className={`overflow-hidden ${
                  activeMenuIndex === index ? "transition-all duration-600" : ""
                }`}
              >
                <ul
                  className={`w-full transform ${
                    activeMenuIndex === index
                      ? "translate-y-0"
                      : "-translate-y-full h-0"
                  }`}
                >
                  {(group.children || []).map((item, index) => (
                    <li key={index} className="w-full">
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
                        <span className="flex items-center gap-1">
                          {item.name}
                          {item.type === "outlink" && (
                            <FiExternalLink className="w-4 h-4 inline-block" />
                          )}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
