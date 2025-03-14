import { useEffect, useState } from "react";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";

import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";

const treeDataDummy = 
[
  {
    value: "G1",
    label: "권역1",
    children: [
      { value: "1001_G1", label: "춘천점", },
      { value: "1002_G1", label: "원주점" },
    ],
  },
  {
    value: "G2",
    label: "권역2",
    children: [
      { value: "1003_G2", label: "일산점" },
      { value: "1004_G2", label: "수지점" },
      { value: "1005_G2", label: "수원점" },
    ],
  },
  { value: "1001", label: "춘천점", },
  { value: "1002", label: "원주점" },
  { value: "1003", label: "일산점" },
  { value: "1004", label: "수지점" },
  { value: "1005", label: "수원점" },
];

const iconStyle = {
  width: "18px",
  height: "18px",
  display: "inline-block",
};

// 선택된 점포 리스트에 들어갈 점포명 찾아 return
const findStoreLabelByValue = (nodes, values) => {
  let stores = [];

  const findLabel = (nodeList) => {
    nodeList.forEach((node) => {
      if (values.includes(node.value)) { // 개별 점포들
        stores.push({ value: node.value, label: node.label });
      }
      if (node.children) { // 그룹 안에 점포들
        findLabel(node.children);
      }
    });
  };

  findLabel(nodes);
  return stores;
};

const AddGroupModal = ({ modalRef }) => {
  // 전체 점포 목록 (왼쪽)
  const [allStores, setAllStores] = useState(treeDataDummy);
  const [checkedAllStores, setCheckedAllStores] = useState([]);
  const [expandedAllStores, setExpandedAllStores] = useState([]);

  // 선택된 점포 목록 (오른쪽)
  const [chosenStores, setChosenStores] = useState([]);
  const [checkedChosenStores, setCheckedChosenStores] = useState([]);
  const [expandedChosenStores, setExpandedChosenStores] = useState([]);

  // 왼쪽에서 오른쪽으로 이동
  const handleMoveToRight = () => {
    const newStores = findStoreLabelByValue(allStores, checkedAllStores);

    // 오른쪽에 중복되는 값 필터링
    const filteredStores = newStores.filter(
      (store) => !chosenStores.some((s) => s.value === store.value)
    );

    setChosenStores((prev) => [...prev, ...filteredStores]);
    setCheckedAllStores([]);
  };

  // 선택된 점포에서 제거
  const handleRemoveStores = () => {
    setChosenStores((prev) => prev.filter((store) => !checkedChosenStores.includes(store.value)));
    setCheckedChosenStores([]);
  };

  /* 모달창 닫을 때 수행 할 로직 */
  useEffect(() => {
    const modal = modalRef?.current;
    console.log(modal)
    if (!modal) return;

    const handleClose = () => {
      setAllStores(treeDataDummy);
      setCheckedAllStores([]);
      setExpandedAllStores([]);
      setChosenStores([]);
      setCheckedChosenStores([]);
      setExpandedChosenStores([]);
    };

    modal.addEventListener("close", handleClose);

    return () => {
      modal.removeEventListener("close", handleClose);
    };
  }, [modalRef]);

  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box bg-white max-w-3xl">
        <h3 className="mb-6 pb-6 font-semibold text-lg border-b">그룹 생성</h3>
        <div className="mb-6">
          <input type="text" className="input w-full" placeholder="그룹명을 입력하세요" />
        </div>

        <div className="flex justify-between h-[500px]">
          {/* 왼쪽 (전체 점포) */}
          <div className="flex-1 flex flex-col overflow-hidden h-full">
            <h4 className="mb-2 p-1.5 bg-gray-100 font-semibold text-center">
              전체 점포 : {allStores.length}개
            </h4>
            <div className="flex-1 p-2 h-full border overflow-y-scroll">
              <CheckboxTree
                nodes={allStores}
                checked={checkedAllStores}
                expanded={expandedAllStores}
                onCheck={setCheckedAllStores}
                onExpand={setExpandedAllStores}
                showNodeIcon={false}
                icons={{
                  check: <ImCheckboxChecked style={iconStyle} />,
                  uncheck: <ImCheckboxUnchecked style={iconStyle} />,
                  halfCheck: <ImCheckboxChecked style={{ ...iconStyle, color: "#ccc" }} />,
                  expandClose: <IoIosArrowForward style={iconStyle} />,
                  expandOpen: <IoIosArrowDown style={iconStyle} />,
                }}
              />
            </div>
          </div>

          {/* 이동 버튼 */}
          <div className="flex flex-col items-center justify-center gap-2 h-full w-16">
            <button className="btn btn-sm btn-primary" onClick={handleMoveToRight} disabled={checkedAllStores.length === 0}>
              <FaArrowRightLong />
            </button>
            <button className="btn btn-sm" onClick={handleRemoveStores} disabled={checkedChosenStores.length === 0}>
              <FaArrowLeftLong />
            </button>
          </div>

          {/* 오른쪽 (선택된 점포) */}
          <div className="flex-1 flex flex-col overflow-hidden h-full">
            <h4 className="mb-2 p-1.5 bg-gray-100 font-semibold text-center">
              선택된 점포 : {chosenStores.length}개
            </h4>
            <div className="flex-1 p-2 h-full border overflow-y-scroll">
              <CheckboxTree
                nodes={chosenStores}
                checked={checkedChosenStores}
                expanded={expandedChosenStores}
                onCheck={setCheckedChosenStores}
                onExpand={setExpandedChosenStores}
                showNodeIcon={false}
                icons={{
                  check: <ImCheckboxChecked style={iconStyle} />,
                  uncheck: <ImCheckboxUnchecked style={iconStyle} />,
                  halfCheck: <ImCheckboxChecked style={{ ...iconStyle, color: "#ccc" }} />,
                  expandClose: <IoIosArrowForward style={iconStyle} />,
                  expandOpen: <IoIosArrowDown style={iconStyle} />,
                }}
              />
            </div>
          </div>
        </div>

        {/* 모달 버튼 */}
        <form method="dialog">
          <div className="flex w-full items-center justify-center gap-2.5 mt-12">
            <button className="absolute right-3 top-4 w-10 h-10 text-2xl">✕</button>
            <button className="btn min-w-24">취소</button>
            <button type="submit" className="btn btn-primary min-w-24">선택</button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default AddGroupModal;
