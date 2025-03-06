import { useState } from "react";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";

import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { ImCheckboxUnchecked } from "react-icons/im";
import { ImCheckboxChecked } from "react-icons/im";

const treeDataDummy = [
  {
    value: "gangwon",
    label: "비비고 왕만두 이벤트매장",
    children: [
      { value: "chuncheon", label: "춘천점" },
      { value: "wonju", label: "원주점" },
      { value: "gangneung", label: "강릉점" },
    ],
  },
  {
    value: "gyeonggi",
    label: "경기본부",
    children: [
      { value: "ilsan", label: "일산점" },
      { value: "suji", label: "수지점" },
      { value: "suwon", label: "수원점" },
    ],
  },
  {
    value: "kintex",
    label: "트레이더스 킨텍스점",
  },
  {
    value: "kintex2",
    label: "트레이더스 킨텍스점2",
  },
  {
    value: "kintex3",
    label: "트레이더스 킨텍스점3",
  },
  {
    value: "kintex4",
    label: "트레이더스 킨텍스점4",
  },
];

const seletedDummy = [
  {
    value: "seleted",
    label: "선택된 매장",
  },
  {
    value: "seleted2",
    label: "선택된 매장",
  },
];

const iconStyle = {
  width: "18px",
  height: "18px",
  display: "inline-block",
};

const StoreSelectModal = ({ modalRef }) => {
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box bg-white max-w-3xl">
        <h3 className="mb-6 pb-6 font-semibold text-lg border-b">점포선택</h3>

        <div className="flex justify-between h-[500px]">
          <div className="flex-1 flex flex-col overflow-hidden h-full">
            <h4 className="mb-2 p-1.5 bg-gray-100 font-semibold text-center">
              전체 점포 : 122개
            </h4>
            <div className="flex-1 p-2 h-full border overflow-y-scroll">
              <CheckboxTree
                nodes={treeDataDummy}
                checked={checked}
                expanded={expanded}
                onCheck={(checked) => setChecked(checked)}
                onExpand={(expanded) => setExpanded(expanded)}
                showNodeIcon={false}
                icons={{
                  check: <ImCheckboxChecked style={iconStyle} />,
                  uncheck: <ImCheckboxUnchecked style={iconStyle} />,
                  halfCheck: (
                    <ImCheckboxChecked
                      style={{ ...iconStyle, color: "#ccc" }}
                    />
                  ),
                  expandClose: <IoIosArrowForward style={iconStyle} />,
                  expandOpen: <IoIosArrowDown style={iconStyle} />,
                }}
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 h-full w-16">
            <button className="btn btn-sm btn-primary">
              <FaArrowRightLong />
            </button>
            <button className="btn btn-sm">
              <FaArrowLeftLong />
            </button>
          </div>
          <div className="flex-1 flex flex-col overflow-hidden h-full">
            <h4 className="mb-2 p-1.5 bg-gray-100 font-semibold text-center">
              선택된 점포 : {checked.length}개
            </h4>
            <div className="flex-1 p-2 h-full border overflow-y-scroll">
              <CheckboxTree
                nodes={seletedDummy}
                checked={checked}
                expanded={expanded}
                onCheck={(checked) => setChecked(checked)}
                onExpand={(expanded) => setExpanded(expanded)}
                showNodeIcon={false}
                icons={{
                  check: <ImCheckboxChecked style={iconStyle} />,
                  uncheck: <ImCheckboxUnchecked style={iconStyle} />,
                  halfCheck: (
                    <ImCheckboxChecked
                      style={{ ...iconStyle, color: "#ccc" }}
                    />
                  ),
                  expandClose: <IoIosArrowForward style={iconStyle} />,
                  expandOpen: <IoIosArrowDown style={iconStyle} />,
                }}
              />
              {/* 라이브러리 제공 체크된 리스트 */}
              <ul>
                {checked.map((store) => (
                  <li key={store} className="text-blue-600">
                    {store}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <form method="dialog">
          <div className="flex w-full items-center justify-center gap-2.5 mt-12">
            <button className="absolute right-3 top-4 w-10 h-10 text-2xl">
              ✕
            </button>
            <button className="btn min-w-24">취소</button>
            <button type="submit" className="btn btn-primary min-w-24">
              선택
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default StoreSelectModal;
