import { format } from "date-fns";
import Pagination from "../../../components/pagination/Pagination";
import { toYYYYMMDD } from "../../../utils/customFormat";
import EmptyState from "../../../components/emptyState/EmptyState";

const UserTable = ({
  setUserId,
  userList,
  page,
  total,
  limit,
  setPage,
  openModal
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>순서</th>
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
              <tr
                key={index}
                className="hover"
              >
                <td>{index + 1}</td>
                <td>
                  <button onClick={() => {
                    setUserId(item.uuid);
                    openModal();
                  }
                  } className="hover:underline">
                    {item.user_id}
                  </button>
                </td>
                <td>{item.user_name}</td>
                <td>
                  {item.level === 0
                    ? "전체 관리자"
                    : item.level === 1
                      ? "브랜드 관리자"
                      : item.level === 2
                        ? "광고 관리자"
                        : "점포 관리자"}
                </td>
                <td>{item.brand_code.join("/")}</td>
                <td>{item.store_code}</td>
                <td
                  className={
                    `text-${item.status === "승인" ? "green" : "red"}-500`
                  }
                >
                  {item.status}
                </td>
                <td></td>
                <td>{toYYYYMMDD(item.updated_at)}</td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {userList.length === 0 && <EmptyState text="일치하는 검색 결과가 없습니다." />}
      {/* <!--페이지 네이션 --> */}
      <Pagination
        page={page}
        total={total}
        limit={limit}
        setPage={setPage}
      />
    </div>
  );
};

export default UserTable;
