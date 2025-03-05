import React from "react";
import useSidebar from "./hooks/useSidebar";
import { NavLink } from "react-router-dom";

import { IoCubeOutline } from "react-icons/io5";
import { MdCalendarToday } from "react-icons/md";
import { PiWaveformBold } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";

//데이터 구조 모릅니다. 더미입니다.
//추후 데이터 구조에 따른, 퍼블수정예정
const dummyMenu = [
  {
    title: "타입캐스트",
    icon: <IoCubeOutline className="text-2xl" />,
    items: [{ name: "타입캐스트", path: "/dashboard" }],
  },
  {
    title: "스케줄",
    icon: <MdCalendarToday className="text-xl" />,
    items: [
      { name: "방송/장비현황", path: "/equipment-status" },
      { name: "방송등록", path: "/broadcast-register" },
      { name: "예약관리", path: "/reservation-management" },
    ],
  },
  {
    title: "광고",
    icon: <PiWaveformBold className="text-2xl" />,
    items: [
      { name: "광고등록", path: "/advertisement/resiter" },
      { name: "광고현황", path: "/advertisement/status" },
      { name: "광고스케줄", path: "/advertisement/schedule" },
    ],
  },
  {
    title: "관리자",
    icon: <IoSettingsOutline className="text-2xl" />,
    items: [
      { name: "사용자관리", path: "/manager/user-management" },
      { name: "장비관리", path: "/manager/equipment-management" },
      { name: "점포그룹", path: "/manager/store-group" },
      { name: "장비통계", path: "/manager/equipment-stats" },
      { name: "광고통계", path: "/manager/ad-stats" },
      { name: "광고계약 관리", path: "/manager/ad-company-resiter" },
      { name: "광고승인", path: "/manager/ad-approval" },
    ],
  },
];

const Sidebar = () => {
  const { menu, handleNavigation, location } = useSidebar();

  return (
    <aside
      className="wide:w-[210px] w-[160px] bg-[#484c56] wide:fixed absolute top-[60px] left-0 bottom-0 wide:h-full custom:z-10"
      style={{ height: "calc(100% - 60px)" }}
    >
      <nav className="min:px-6 px-4 pt-8 pb-20 h-full overflow-y-auto">
        <ul className="flex flex-col gap-5 text-white">
          {dummyMenu.map((menu, index) => (
            <li key={index}>
              <h2 className="flex items-center gap-1 font-semibold text-lg mb-1">
                <span className="w-7">{menu.icon}</span> {menu.title}
              </h2>
              <ul className="w-full">
                {menu.items.map((item, index) => (
                  <li key={index} className="w-full">
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `block w-full pl-8 py-2.5  rounded-[5px] leading-none  ${
                          isActive
                            ? "bg-accent font-medium text-black"
                            : "hover:bg-gray-700"
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        {/* 기존 코딩 START*/}
        {/* <ul className="menu text-white">
          {menu.map((item) =>
            item.children === undefined ? (
              <li key={item.code}>
                <button onClick={() => handleNavigation(item.url, item.type)}>
                  {item.name}
                </button>
              </li>
            ) : (
              <li key={item.code}>
                <h2 className="menu-title">{item.name}</h2>
                <ul>
                  {item.children.map((child) => (
                    <li key={child.code}>
                      <button
                        onClick={() => handleNavigation(child.url, child.type)}
                        className={
                          location.pathname === child.url
                            ? "bg-primary rounded-md text-white font-semibold"
                            : ""
                        }
                      >
                        {child.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
            )
          )}
        </ul> */}
        {/* 기존 코딩 END */}
      </nav>
    </aside>
  );
};

export default Sidebar;
