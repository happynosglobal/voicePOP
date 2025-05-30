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
  // initialChosenStores,
}) => {
  const { storeByBrandCode, storesForTree, isLoading } = useCodes();
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
  const [allStores, setAllStores] = useState([]);
  const [checkedAllStores, setCheckedAllStores] = useState([]);
  const [expandedAllStores, setExpandedAllStores] = useState([]);

  // 선택된 점포 목록 (오른쪽)
  const [chosenStores, setChosenStores] = useState([]);
  const [checkedChosenStores, setCheckedChosenStores] = useState([]);
  const [expandedChosenStores, setExpandedChosenStores] = useState([]);

  // 선택된 점포로 넘기기 전 선택된 원본 노드
  const [tempCheckedStores, setTempCheckedStores] = useState([]);

  // 선택딘 점포 세팅
  // useEffect(() => {
  //   setChosenStores(initialChosenStores);
  // }, [initialChosenStores]);

  // 권역별 기본 그룹 + 커스텀 그룹 -> 전체점포 Tree 구조에 set
  useEffect(() => {
    if (addable) {
      setAllStores([...storesForTree]);
    } else {
      setAllStores([...storesForTree, ...storeGroupListForTree]);
    }
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
    const selectedMap = new Map(chosenStores.map((s) => [s.value, s]));

    const extractLabel = (label) => {
      if (typeof label === "string") return label;
      if (label?.props?.children) return label.props.children;
      return "그룹";
    };

    const addNode = (node) => {
      if (node.type === "wrapper") {
        node.children?.forEach(addNode); // wrapper는 통과
        return;
      }

      if (node.type === "group") {
        const childValues = getLeafValues([node]);
        const allChildrenChecked = childValues.every((v) =>
          tempCheckedStores.includes(v)
        );

        if (allChildrenChecked) {
          selectedMap.set(node.value, {
            type: "group",
            value: node.value,
            label: extractLabel(node.label),
          });
          return;
        }

        // 자식들 중 일부만 체크된 상태 → store 단위만 추가
        node.children?.forEach(addNode);
      }

      if (node.type === "store" && tempCheckedStores.includes(node.value)) {
        selectedMap.set(node.key || node.value, {
          type: "store",
          value: node.key || node.value,
          label: node.label,
        });
      }
    };

    const traverse = (nodes) => {
      nodes.forEach(addNode);
    };

    const nodesToProcess = isSearching ? filteredStores : allStores;
    traverse(nodesToProcess);

    const sorted = [...selectedMap.values()].sort((a, b) => {
      if (a.type === "group" && b.type !== "group") return -1;
      if (a.type !== "group" && b.type === "group") return 1;
      return 0;
    });

    setChosenStores(sorted);

    setCheckedAllStores([]);
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

  /* 모달창 닫을 때 수행 할 로직 */
  useEffect(() => {
    const modal = modalRef?.current;
    if (!modal) return;
    const handleClose = () => {
      setGroupName("");
      setSearchKeyword("");
      setIsSearching(false);
      setFilteredStores([]);
      setCheckedAllStores([]);
      setTempCheckedStores([]);
      setExpandedAllStores([]);
      setSearchChosenKeyword("");
      setIsSearchingChosen(false);
      setFilteredChosenStores([]);
      setChosenStores([]);
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
  const extractLabelText = (label) => {
    if (typeof label === "string") return label;
    if (label?.props?.children) {
      return Array.isArray(label.props.children)
        ? label.props.children.join("")
        : label.props.children;
    }
    return "";
  };

  const flattenStoreNodes = (nodes) => {
    let result = [];

    for (const node of nodes) {
      if (node.type === "store") {
        result.push(node);
      } else if (node.children) {
        result = result.concat(flattenStoreNodes(node.children));
      }
    }

    return result;
  };

  const handleSearch = () => {
    setCheckedAllStores([]);
    setTempCheckedStores([]);
    setIsSearching(true);

    if (searchKeyword.trim() === "") {
      setFilteredStores([]);
      setIsSearching(false);
      return;
    }

    const keywordLower = searchKeyword.trim().toLowerCase();
    const allLeafNodes = flattenStoreNodes(allStores);

    // 중복 제거: key 기준으로 Set
    const uniqueByKey = new Map();
    for (const node of allLeafNodes) {
      const label = extractLabelText(node.label).toLowerCase();
      if (label.includes(keywordLower)) {
        uniqueByKey.set(node.key, node); // key가 중복되면 마지막 것만 유지됨
      }
    }

    setFilteredStores(Array.from(uniqueByKey.values()));
  };

  const handleSearchChosen = () => {
    setCheckedChosenStores([]);
    setIsSearchingChosen(true);

    if (searchChosenKeyword.trim() === "") {
      setFilteredChosenStores([]);
      setIsSearchingChosen(false);
      return;
    }

    const keywordLower = searchChosenKeyword.trim().toLowerCase();

    const filtered = chosenStores.filter(
      (node) =>
        node.type === "store" &&
        extractLabelText(node.label).toLowerCase().includes(keywordLower)
    );

    setFilteredChosenStores(filtered);
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

  const findGroupNodeByValue = (nodes, targetValue) => {
    for (const node of nodes) {
      if (node.type === "group" && node.value === targetValue) {
        return node;
      } else if (node.children) {
        const found = findGroupNodeByValue(node.children, targetValue);
        if (found) return found;
      }
    }
    return null;
  };

  const getSubmitStoreList = () => {
    const allLeafNodes = flattenStoreNodes(allStores);
    const storeMap = new Map();

    chosenStores.forEach((node) => {
      if (node.type === "store") {
        storeMap.set(node.value, {
          value: node.value,
          label: node.label,
        });
      } else if (node.type === "group") {
        // group.value와 일치하는 group 노드 찾기
        const groupNode = findGroupNodeByValue(allStores, node.value);
        if (groupNode && groupNode.children) {
          groupNode.children.forEach((child) => {
            if (child.type === "store") {
              storeMap.set(child.key || child.value, {
                value: child.key || child.value,
                label: child.label,
              });
            }
          });
        }
      }
    });

    return Array.from(storeMap.values());
  };
  const storeCount = chosenStores.filter((n) => n.type === "store").length;
  const groupCount = chosenStores.filter((n) => n.type === "group").length;

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
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
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
                      ? filteredStores // 검색 중이면 검색 결과
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
                선택됨: 그룹({groupCount}) 점포({storeCount})
              </h4>

              <div className="flex items-center mb-2 gap-2.5">
                <input
                  name="chosen_store_name"
                  type="text"
                  placeholder="선택된 점포명 검색"
                  className="input input-bordered w-full focus:ring-0 focus:outline-none"
                  value={searchChosenKeyword}
                  onChange={(e) => setSearchChosenKeyword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearchChosen();
                    }
                  }}
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
                onClick={() =>
                  handleSubmit(groupName, getSubmitStoreList(), null)
                }
                disabled={addable && !groupName ? true : false}
              >
                확인
              </button>
            ) : (
              <>
                <button
                  type="submit"
                  className="btn btn-primary min-w-24"
                  onClick={() =>
                    handleSubmit(groupName, getSubmitStoreList(), groupId)
                  }
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
        <LoadingSpinner includeCodesLoading={true} />
      </dialog>
    </>
  );
};

export default GroupSelectModal;
