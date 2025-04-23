import { useEffect, useState } from "react";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";

import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";
import useCodes from "../../stores/codes";
import Input from "../input/Input";
import LoadingSpinner from "../loading/LoadingSpinner";
import { getGroupInfo } from "../../hooks/useStoreCode";
import useStoreGroupModal from "../../hooks/useStoreGroupModal";

const iconStyle = {
  width: "18px",
  height: "18px",
  display: "inline-block",
};

const GroupSelectModal = ({
  modalRef,
  label,
  handleSubmit,
  handleDeleteGroup,
  addable,
  mode,
  groupId,
  setGroupId,
  initialChosenStores = [],
}) => {
  const { storeByBrandCode, storesForTree } = useCodes();
  const { storeGroupListForTree, getStoreGroupListForTree } =
    useStoreGroupModal();

  useEffect(() => {
    getStoreGroupListForTree();
  }, []);

  /* ---- GroupSelect Tree 컨트롤 Start ----*/
  // 그룹명
  const [groupName, setGroupName] = useState("");

  // 점포 검색어, 결과
  const [isSearching, setIsSearching] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredStores, setFilteredStores] = useState([]);

  const [isSearchingChosen, setIsSearchingChosen] = useState(false);
  const [searchChosenKeyword, setSearchChosenKeyword] = useState("");
  const [filteredChosenStores, setFilteredChosenStores] = useState([]);

  // 전체 점포 목록 (왼쪽)
  const [allStores, setAllStores] = useState([
    ...storeGroupListForTree,
    ...storesForTree,
  ]);

  const [checkedAllStores, setCheckedAllStores] = useState([]);
  const [expandedAllStores, setExpandedAllStores] = useState([]);

  // 선택된 점포 목록 (오른쪽)
  const [chosenStores, setChosenStores] = useState([]);
  const [checkedChosenStores, setCheckedChosenStores] = useState([]);
  const [expandedChosenStores, setExpandedChosenStores] = useState([]);

  // 선택된 점포로 넘기기 전 선택된 원본 노드
  const [tempCheckedStores, setTempCheckedStores] = useState([]);
  console.log(initialChosenStores)
  console.log(chosenStores)
  // 권역별 기본 그룹 + 커스텀 그룹 -> 전체점포 Tree 구조에 set
  useEffect(() => {
    setAllStores([...storeGroupListForTree, ...storesForTree]);
  }, [storeGroupListForTree, storesForTree]);

  // 점포 체크박스 선택
  const handleCheckStores = (checkedValues) => {
    setTempCheckedStores(checkedValues); // 원본 값 그대로 저장

    // `_` 앞의 값만 남겨서 중복 제거한 새로운 Set 생성
    const newCheckedSet = new Set(
      checkedValues.map((value) => value.split("_")[0])
    );

    // 실제 이동할 그룹명을 지운 선택된 점포로 이동할 state 업데이트
    setCheckedAllStores([...newCheckedSet]);
  };

  // 전체점포 선택
  const handleCheckAllStores = () => {
    const targetNodes = filteredStores.length > 0 ? filteredStores : allStores;
    const allLeafValues = getLeafValues(targetNodes);

    setTempCheckedStores(allLeafValues);
    setCheckedAllStores(
      [...new Set(allLeafValues.map((v) => v.split("_")[0]))] // 오른쪽 이동용 Set
    );
  };

  const handleCheckAllChosenStores = () => {
    const targetNodes =
      isSearchingChosen && filteredChosenStores.length > 0
        ? filteredChosenStores
        : chosenStores;

    const allLeafValues = getLeafValues(targetNodes);
    setCheckedChosenStores(allLeafValues);
  };

  //check된 점포들 선택된 점포로 이동
  const handleMoveToChosenStores = () => {
    // 이미 선택된 점포에 있는 점포 목록 세팅
    const selectedSet = new Set(chosenStores.map((store) => store.value));

    checkedAllStores.forEach((value) => {
      // const baseValue = value.split("_")[0]; // "1001_G1" -> "1001"
      selectedSet.add(value);
    });

    // 기존 선택된 점포 + 새로 선택된 점포
    const newChosenStores = [...selectedSet].map((value) => {
      // 전체 점포 정보에서 value(점포코드)로 label(점포명) 가져오기
      const matchedStore = storeByBrandCode.find(
        (store) => store.value === value
      );
      return {
        value,
        label: matchedStore ? matchedStore.label : `점포 ${value}`, // 점포명 label이 정보에 없을경우 임시로 점포 + 점포코드로 표시
      };
    });

    setChosenStores(newChosenStores);
    setCheckedAllStores([]); // 왼쪽 체크 초기화
    setTempCheckedStores([]);
  };

  // 선택된 점포에서 제거
  const handleRemoveStores = () => {
    setChosenStores((prev) =>
      prev.filter((store) => !checkedChosenStores.includes(store.value))
    );
    setCheckedChosenStores([]);
  };
  /* ---- GroupSelect Tree 컨트롤 End ----*/

  /* ---- Tree Data 컨트롤 Start ----*/

  useEffect(() => {
      setChosenStores(initialChosenStores);
  }, [initialChosenStores]);
  // 개별 그룹 정보 조회(수정 및 삭제 모달)
  const getStoreGroupInfo = async () => {
    try {
      const { groupName, groupedStores } = await getGroupInfo(groupId);

      setGroupName(groupName);
      setChosenStores(groupedStores);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (mode === "modify" && groupId) {
      getStoreGroupInfo();
    }
  }, [mode, groupId]);
  /* ---- Tree Data 컨트롤 End ----*/
    /* 모달창 열 때 수행 할 로직 */
  useEffect(() => {
    console.log(1)
    const modal = modalRef?.current;
    if (!modal) return;
    console.log(2)
  
    const handleOpen = () => {
      setChosenStores(initialChosenStores);
      // 필요한 로직 추가 가능
    };
  
    modal.addEventListener("open", handleOpen);
  
    return () => {
      modal.removeEventListener("open", handleOpen);
    };
  }, [modalRef]);
  /* 모달창 닫을 때 수행 할 로직 */
  useEffect(() => {
    const modal = modalRef?.current;
    if (!modal) return;
    const handleClose = () => {
      setGroupName("");
      setSearchKeyword("");
      setFilteredStores([]);
      setCheckedAllStores([]);
      setTempCheckedStores([]);
      setExpandedAllStores([]);
      if (addable) setChosenStores([]);
      setCheckedChosenStores([]);
      setExpandedChosenStores([]);
      if (setGroupId) setGroupId(null);
    };

    modal.addEventListener("close", handleClose);

    return () => {
      modal.removeEventListener("close", handleClose);
    };
  }, [modalRef]);

  // 점포 검색
  const handleSearch = () => {
    setCheckedAllStores([]);
    setTempCheckedStores([]);
    setIsSearching(true); // 검색 중 상태 ON

    const combinedStores = [...storeGroupListForTree, ...storesForTree];

    const filterNodes = (nodes, keyword) => {
      return nodes
        .map((node) => {
          if (node.label.toLowerCase().includes(keyword.toLowerCase())) {
            return node;
          }

          if (node.children) {
            const filteredChildren = filterNodes(node.children, keyword);
            if (filteredChildren.length > 0) {
              return { ...node, children: filteredChildren };
            }
          }

          return null;
        })
        .filter(Boolean);
    };

    if (searchKeyword.trim() === "") {
      setFilteredStores([]);
      setIsSearching(false);
    } else {
      const filtered = filterNodes(combinedStores, searchKeyword);
      setFilteredStores(filtered); // 검색 결과 (빈 배열 포함)
    }
  };

  const handleSearchChosen = () => {
    setCheckedChosenStores([]);
    setIsSearchingChosen(true);

    const filterNodes = (nodes, keyword) => {
      return nodes
        .map((node) => {
          if (node.label.toLowerCase().includes(keyword.toLowerCase())) {
            return node;
          }

          if (node.children) {
            const filteredChildren = filterNodes(node.children, keyword);
            if (filteredChildren.length > 0) {
              return { ...node, children: filteredChildren };
            }
          }

          return null;
        })
        .filter(Boolean);
    };

    if (searchChosenKeyword.trim() === "") {
      setFilteredChosenStores([]);
      setIsSearchingChosen(false);
    } else {
      const filtered = filterNodes(chosenStores, searchChosenKeyword);
      setFilteredChosenStores(filtered);
    }
  };

  const getLeafValues = (nodes) => {
    let result = [];
    nodes.forEach((node) => {
      if (node.children && node.children.length > 0) {
        result = result.concat(getLeafValues(node.children));
      } else {
        result.push(node.value);
      }
    });
    return result;
  };

  return (
    <>
      <dialog ref={modalRef} className="modal">
        <div className="modal-box bg-white max-w-3xl">
          <h3 className="mb-6 pb-6 font-semibold text-lg border-b">{label}</h3>
          {addable && (
            <div className="mb-2">
              <Input
                type="text"
                className="input w-full focus:ring-0 focus:outline-none"
                placeholder="그룹명을 입력하세요"
                value={groupName}
                onChange={(e) => {
                  setGroupName(e.target.value);
                }}
              />
            </div>
          )}
          <div className="flex justify-between h-[500px]">
            {/* 왼쪽 (전체 점포) */}
            <div className="flex-1 flex flex-col overflow-hidden h-full">
              <h4 className="flex mb-2 h-9 px-5 font-medium text-center bg-sky-50 text-sky-600 leading-tight rounded-md justify-end items-center">
                전체 점포 : {storeByBrandCode.length}개
              </h4>
              <div className="flex items-center mb-2 gap-2.5">
                <input
                  name="store_name"
                  type="text"
                  placeholder="점포명을 입력해주세요."
                  className="input input-bordered w-full focus:ring-0 focus:outline-none"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <button
                  className="btn btn-accent btn-sm"
                  onClick={handleSearch}
                >
                  검색
                </button>
              </div>
              <div className="flex w-full items-center gap-2 mb-2">
                <button
                  className="btn btn-accent btn-xs bg-gray-500"
                  onClick={handleCheckAllStores}
                >
                  전체선택
                </button>
                <button
                  className="btn btn-accent btn-xs bg-gray-500"
                  onClick={() => {
                    setTempCheckedStores([]);
                    setCheckedAllStores([]);
                  }}
                >
                  전체해제
                </button>
              </div>
              <div className="flex-1 p-2 h-full border overflow-y-scroll">
                <CheckboxTree
                  nodes={
                    isSearching
                      ? filteredStores // 검색 중이면 검색 결과 (빈 배열도 허용)
                      : allStores // 검색 중이 아닐 때 전체 트리
                  }
                  checked={tempCheckedStores}
                  expanded={expandedAllStores}
                  onCheck={handleCheckStores}
                  onExpand={setExpandedAllStores}
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

            {/* 이동 버튼 */}
            <div className="flex flex-col items-center justify-center gap-2 h-full w-16">
              <button
                className="btn btn-sm btn-primary"
                onClick={handleMoveToChosenStores}
                disabled={checkedAllStores.length === 0}
              >
                <FaArrowRightLong />
              </button>
              <button
                className="btn btn-sm"
                onClick={handleRemoveStores}
                disabled={checkedChosenStores.length === 0}
              >
                <FaArrowLeftLong />
              </button>
            </div>

            {/* 오른쪽 (선택된 점포) */}
            <div className="flex-1 flex flex-col overflow-hidden h-full">
              <h4 className="flex mb-2 h-9 px-5 font-medium text-center bg-sky-50 text-sky-600 leading-tight rounded-md justify-end items-center">
                선택된 점포 : {chosenStores.length}개
              </h4>
              <div className="flex items-center mb-2 gap-2.5">
                <input
                  name="chosen_store_name"
                  type="text"
                  placeholder="선택된 점포명 검색"
                  className="input input-bordered w-full focus:ring-0 focus:outline-none"
                  value={searchChosenKeyword}
                  onChange={(e) => setSearchChosenKeyword(e.target.value)}
                />
                <button
                  className="btn btn-accent btn-sm"
                  onClick={handleSearchChosen}
                >
                  검색
                </button>
              </div>
              <div className="flex w-full items-center gap-2 mb-2">
                <button
                  className="btn btn-accent btn-xs bg-gray-500"
                  onClick={handleCheckAllChosenStores}
                >
                  전체선택
                </button>
                <button
                  className="btn btn-accent btn-xs bg-gray-500"
                  onClick={() => {
                    setCheckedChosenStores([]);
                  }}
                >
                  전체해제
                </button>
              </div>
              <div className="flex-1 p-2 h-full border overflow-y-scroll">
                <CheckboxTree
                  nodes={
                    isSearchingChosen ? filteredChosenStores : chosenStores
                  }
                  checked={checkedChosenStores}
                  expanded={expandedChosenStores}
                  onCheck={setCheckedChosenStores}
                  onExpand={setExpandedChosenStores}
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
          </div>

          {/* 모달 버튼 */}
          <div className="flex w-full items-center justify-center gap-2.5 mt-12">
            <button
              className="absolute right-3 top-4 w-10 h-10 text-2xl"
              onClick={() => modalRef.current.close()}
            >
              ✕
            </button>
            <button
              className="btn min-w-24"
              onClick={() => modalRef.current.close()}
            >
              취소
            </button>
            {mode === "add" ? (
              <button
                type="submit"
                className="btn btn-primary min-w-24"
                onClick={() => handleSubmit(groupName, chosenStores, null)}
              >
                확인
              </button>
            ) : (
              <>
                <button
                  type="submit"
                  className="btn btn-primary min-w-24"
                  onClick={() => handleSubmit(groupName, chosenStores, groupId)}
                >
                  수정
                </button>
                <button
                  type="submit"
                  className="btn btn-error min-w-24"
                  onClick={() => handleDeleteGroup(groupId)}
                >
                  삭제
                </button>
              </>
            )}
          </div>
        </div>
        <LoadingSpinner />
      </dialog>
    </>
  );
};

export default GroupSelectModal;
