import { useEffect, useState } from "react";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";

import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";
import useStores from "../../stores/stores";

const iconStyle = {
  width: "18px",
  height: "18px",
  display: "inline-block",
};

const GroupSelectModal = ({ modalRef, label, searchable }) => {
  const { stores } = useStores();


  // 전체 점포 목록 (왼쪽)
  const [allStores, setAllStores] = useState(stores || []);
  const [checkedAllStores, setCheckedAllStores] = useState([]);
  const [expandedAllStores, setExpandedAllStores] = useState([]);

  // 선택된 점포 목록 (오른쪽)
  const [chosenStores, setChosenStores] = useState([]);
  const [checkedChosenStores, setCheckedChosenStores] = useState([]);
  const [expandedChosenStores, setExpandedChosenStores] = useState([]);

  const handleMoveToChosenStores = () => {
    const newChosenStores = new Set([...chosenStores.map(store => store.value)]);

    checkedAllStores.forEach(storeValue => {
      // 그룹 점포인지 확인 (예: 1001_G1)
      const isGroupStore = storeValue.includes('_');
      if (isGroupStore) {
        const originalStoreId = storeValue.split('_')[0]; // "1001_G1" -> "1001"
        newChosenStores.add(originalStoreId);
      } else {
        newChosenStores.add(storeValue);
      }
    });

    // 기존 선택된 점포 + 새로 선택된 점포
    setChosenStores(allStores.filter(store => newChosenStores.has(store.value)));
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
    if (!modal) return;

    const handleClose = () => {
      setAllStores(stores);
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
    <>
      {/* {
        allStores.length > 0 && ( */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box bg-white max-w-3xl">
          <h3 className="mb-6 pb-6 font-semibold text-lg border-b">{label}</h3>
          {searchable && (
            <div className="mb-6">
              <input type="text" className="input w-full" placeholder="그룹명을 입력하세요" />
            </div>
          )}

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
              <button className="btn btn-sm btn-primary" onClick={handleMoveToChosenStores} disabled={checkedAllStores.length === 0}>
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
      {/* )
      } */}
    </>
  );
};

export default GroupSelectModal;

