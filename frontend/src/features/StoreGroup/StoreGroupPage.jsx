import React, { useEffect, useRef, useState } from "react";
import ContentLayout from "../../layout/ContentLayout";
import Tooltip from "../../components/tooltip/Tooltip";
import Pagination from "../../components/pagination/Pagination";
import GroupSelectModal from "../../components/modal/GroupSelectModal";
import useUserStore from "../../stores/user";
import {
  deleteGroupDetail,
  patchGroup,
  postGroup,
  postGroupDetail,
} from "../../api/storeGroup/storeGroup";
import useHandleStoreGroup from "./hooks/useHandleStoreGroup";
import { toDate } from "../../utils/customFormat";
import { toast } from "react-toastify";
import EmptyState from "../../components/emptyState/EmptyState";

const StoreGroupPage = () => {
  const { user } = useUserStore();
  const groupModalRef = useRef(null); // 점포 선택 모달 ref

  const { page, setPage, total, limit, storeGroupList, getStoreGroupList } =
    useHandleStoreGroup();

  useEffect(() => {
    getStoreGroupList();
  }, [page]);

  const [groupId, setGroupId] = useState(null);

  const handleSubmit = async (name, stores, id) => {
    const groupBody = {
      brand_code: user?.brand_code,
      name: name,
    };
    if (id) {
      groupBody.use_yn = "Y";
    }
    // 선택된 점포 parsing
    const groupedStores = stores.map(({ value, label }) => ({
      store_code: value,
      store_name: label,
    }));

    try {
      // 그룹 생성
      let groupRes = null;
      if (!id) {
        groupRes = await postGroup(groupBody);
      } else if (id) {
        groupRes = await patchGroup(id, groupBody);
      }

      if (groupRes.data.status_code !== 200) {
        throw new Error("그룹 등록 실패");
      }

      const groupId = groupRes.data.data.id;

      if (id) {
        groupRes = await deleteGroupDetail(id);
      }

      if (groupRes.data.status_code !== 200) {
        throw new Error("그룹 내 점포 삭제 실패");
      }

      //그룹 내에 선택된 점포들 등록
      const groupedStoresRes = await postGroupDetail(groupId, {
        brand_code: user?.brand_code,
        user_id: user?.user_id,
        item: groupedStores,
      });

      if (groupedStoresRes.data.status_code !== 200) {
        throw new Error("그룹 내 점포 등록 실패");
      }
      getStoreGroupList(1);
      toast.success("그룹 생성이 완료되었습니다!");
      groupModalRef.current.close();
    } catch (error) {
      console.error("그룹 생성 중 오류 발생:", error);
      toast.error("그룹 생성 중 오류가 발생했습니다.");
    }
  };

  const handleDeleteGroup = async (id) => {
    const groupBody = {
      brand_code: user?.brand_code,
      use_yn: "N",
    };

    try {
      const groupRes = await patchGroup(id, groupBody);

      if (groupRes.data.status_code !== 200) {
        throw new Error("그룹 삭제 실패");
      }

      getStoreGroupList(1);
      toast.success("그룹 삭제가 완료되었습니다!");
      groupModalRef.current.close();
    } catch (error) {
      console.error("그룹 삭제 중 오류 발생:", error);
      toast.error("그룹 삭제 중 오류가 발생했습니다.");
    }
  };
  return (
    <ContentLayout>
      <div className="mb-4 flex items-center justify-end">
        <button
          className="btn btn-sm btn-primary"
          onClick={() => {
            setGroupId(null);
            groupModalRef.current.showModal();
          }}
        >
          그룹 생성
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th className="w-14">순서</th>
            <th className="w-2/12">그룹명</th>
            <th className="w-1/12">점포수</th>
            <th>점포</th>
            <th className="w-2/12">생성일</th>
            <th className="w-1/12">생성자</th>
            <th className="w-20">삭제</th>
          </tr>
        </thead>
        {storeGroupList.length > 0 && (
          <tbody>
            {storeGroupList.map((item, index) => (
              // <tr key={item.id} onClick={() => handleRowClick(item.id)}>
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <button
                    className="hover:underline"
                    onClick={() => {
                      setGroupId(item?.id);
                      groupModalRef.current.showModal();
                    }}
                  >
                    {item.name}
                  </button>
                </td>
                <td>{item.count}</td>
                <td className="truncate">
                  <Tooltip
                    id={item.id}
                    content={item.store_names}
                    place="left"
                  />
                </td>
                <td>{toDate(item.created_at)}</td>
                <td>{item.creater}</td>
                <td>
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => {
                      handleDeleteGroup(item.id);
                    }}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {storeGroupList.length === 0 && (
        <EmptyState text="등록된 그룹 리스트가 없습니다." />
      )}
      <Pagination page={page} total={total} limit={limit} setPage={setPage} />
      {/* 점포선택 모달 */}
      <GroupSelectModal
        modalRef={groupModalRef}
        label={"그룹 생성"}
        handleSubmit={handleSubmit}
        handleDeleteGroup={handleDeleteGroup}
        initialChosenStores={[]}
        mode={groupId ? "modify" : "add"}
        groupId={groupId}
        setGroupId={setGroupId}
        addable
      />
    </ContentLayout>
  );
};

export default StoreGroupPage;
