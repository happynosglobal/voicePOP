import React, { useEffect, useMemo, useRef } from "react";
import useUserStore from "../../stores/user";
import useCodes from "../../stores/codes";

const Tab = ({ activeTab, setActiveTab, onTabChange }) => {
  const tabRefs = useRef({});
  const { user } = useUserStore();
  const { categoryOptions } = useCodes();

  const tabs = useMemo(
    () => [{ code: "", name: "전체" }, ...categoryOptions],
    [categoryOptions]
  );

  useEffect(() => {
    if (tabs.length > 0) {
      setActiveTab(tabs[0].code);
    }
  }, [tabs]);

  const handleClick = (code) => {
    setActiveTab(code);
    if (onTabChange) {
      onTabChange(code);
    }

    // localStorage.setItem("lastActiveTab", code);
  };

  // activeTab이 바뀔 때 해당 버튼으로 가로 스크롤 (세로 이동은 막기)
  useEffect(() => {
    const target = tabRefs.current[activeTab];
    if (target?.scrollIntoView) {
      target.scrollIntoView({
        behavior: "auto",
        inline: "center",
        block: "nearest", // 세로 스크롤 방지
      });
    }
  }, [activeTab]);

  // 컴포넌트 초기 진입 시, 저장된 탭 복원
  // useEffect(() => {
  //   const savedTab = localStorage.getItem("lastActiveTab");
  //   if (
  //     savedTab &&
  //     tabs.some((tab) =>
  //       typeof tab === "object" ? tab.code === savedTab : tab === savedTab
  //     )
  //   ) {
  //     setActiveTab(savedTab);
  //   }
  // }, [tabs, setActiveTab]);


  return (
    <div className="tabs-wrapper">
      <div className="tabs-nav">
        {tabs.map((item, index) => {
          const { code, label } =
            typeof item === "object"
              ? { code: item.code, label: item.name || item.code }
              : { code: item, label: item };

          const isActive = activeTab === code;

          return (
            <button
              key={index}
              ref={(el) => (tabRefs.current[code] = el)}
              className={`tab-btn ${isActive ? "is-active" : ""}`}
              onClick={() => handleClick(code)}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Tab;
