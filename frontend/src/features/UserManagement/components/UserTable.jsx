import Pagination from "../../../components/pagination/Pagination";
import { toDate } from "../../../utils/customFormat";
import EmptyState from "../../../components/emptyState/EmptyState";
import useCodes from "../../../stores/codes";
import { deleteUser } from "../../../api/user/user";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../../utils/constant/messages";
import useSort from "../../../hooks/useSort";
import SortableHeader from "../../../components/sortableHeader/SortableHeader";

const UserTable = ({
  setUserId,
  setUserData,
  userList,
  page,
  total,
  limit,
  setPage,
  openModal,
  handleSort,
  handleGetUsers,
}) => {
  const allStores = useCodes((state) => state.allStoreCode);
  const { sortOption, toggleSort } = useSort(handleSort);

  const getRowNumber = (index) => limit * (page - 1) + index + 1;

  const getStoreNameByCode = (store_code) => {
    if (!store_code) return "";
    const match = allStores.find((store) => store.id === store_code);
    return match?.name || "";
  };

  const handleDeletehUserInfo = async (id) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    try {
      const response = await deleteUser(id);
      const { status } = response;
      if (status === 200) {
        handleGetUsers(1);
        toast.success("사용자 삭제에 성공했습니다.");
      }
    } catch (err) {
      const errMsg = getErrorMessage(err?.response?.data?.message);
      toast.error(errMsg);
    }
  };
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th className="w-14">순서</th>
            <th>ID</th>
            <th>성명</th>
            <th>권한</th>
            <th>브랜드</th>
            <th>점포</th>
            <th>상태</th>
            <th>
              <SortableHeader
                className="inline-flex items-center gap-1 hover:underline"
                label="최종접속"
                sortKey="latest_login_at"
                sortOption={sortOption}
                toggleSort={toggleSort}
              />
            </th>
            <th>
              <SortableHeader
                className="inline-flex items-center gap-1 hover:underline"
                label="승인/수정일"
                sortKey="updated_at"
                sortOption={sortOption}
                toggleSort={toggleSort}
              />
            </th>
            <th className="w-20">삭제</th>
          </tr>
        </thead>
        {userList.length > 0 && (
          <tbody>
            {userList.map((item, index) => (
              <tr key={index} className="hover">
                <td>{getRowNumber(index)}</td>
                <td>
                  <button
                    className="hover:underline"
                    onClick={() => {
                      setUserId(item?.id);
                      setUserData(item);
                      openModal();
                    }}
                  >
                    {item.user_id}
                  </button>
                </td>
                <td>{item.user_name}</td>
                <td>
                  {item.level === "ADMIN"
                    ? "전체 관리자"
                    : item.level === "AD_ADMIN"
                    ? "광고 관리자"
                    : item.level === "BROADCAST_ADMIN"
                    ? "방송 관리자"
                    : "점포 관리자"}
                </td>
                <td>{item.brand_code.join("/")}</td>
                <td>{getStoreNameByCode(item.store_code)}</td>
                <td>
                  <span
                    className={`badge badge-lg ${
                      item.status === "normal"
                        ? "badge-success"
                        : item.status === "require"
                        ? "badge-ghost"
                        : "badge-error"
                    }`}
                  >
                    {item.status === "normal"
                      ? "승인"
                      : item.status === "require"
                      ? "미승인"
                      : item.status === "banned"
                      ? "정지"
                      : item.status === "removed"
                      ? "이용중지"
                      : ""}
                  </span>
                </td>
                <td>{toDate(item.latest_login_at)}</td>
                <td>{toDate(item.updated_at)}</td>
                <td>
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => {
                      handleDeletehUserInfo(item?.id);
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
      {userList.length === 0 && (
        <EmptyState text="일치하는 검색 결과가 없습니다." />
      )}
      <Pagination page={page} total={total} limit={limit} setPage={setPage} />
    </div>
  );
};

export default UserTable;
("현재는 최종접속과 승인/수정일 정렬이 없을 때는 아이콘이 없고 누르면 desc, asc 로 토글만 가능한데 TiArrowSortedUp가 정렬이 가능한 columng에는 항상 떠있다가 해당 컬럼을 클릭하면 내림차순 오름차순 정렬해제 이런순서로 정렬되게 수정하고 싶어");
