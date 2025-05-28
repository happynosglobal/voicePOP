import { format } from "date-fns";
import Pagination from "../../../components/pagination/Pagination";
import { toDate } from "../../../utils/customFormat";
import EmptyState from "../../../components/emptyState/EmptyState";
import useCodes from "../../../stores/codes";

const UserTable = ({
  setUserId,
  userList,
  page,
  total,
  limit,
  setPage,
  openModal,
}) => {
  const allStores = useCodes((state) => state.allStoreCode); // 여기서 직접 상태 구독

  const getStoreNameByCode = (store_code) => {
    if (!store_code) return "";
    const match = allStores.find((store) => store.id === store_code);
    return match?.name || "";
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
            <th>최종접속</th>
            <th>승인/수정일</th>
          </tr>
        </thead>
        {userList.length > 0 && (
          <tbody>
            {userList.map((item, index) => (
              <tr key={index} className="hover">
                <td>{index + 1}</td>
                <td>
                  <button
                    className="hover:underline"
                    onClick={() => {
                      setUserId(item?.id);
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
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {userList.length === 0 && (
        <EmptyState text="일치하는 검색 결과가 없습니다." />
      )}
      {/* <!--페이지 네이션 --> */}
      <Pagination page={page} total={total} limit={limit} setPage={setPage} />
    </div>
  );
};

export default UserTable;
