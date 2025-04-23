import { useEffect, useRef, useState } from "react";
import SearchBar from "./components/SearchBar";
import UserTable from "./components/UserTable";
import AddUserModal from "./components/AddUserModal";
import ContentLayout from "../../layout/ContentLayout";
import useHandleUserList from "./hooks/useHandleUserList";

const UserManagementPage = () => {
  const modalRef = useRef();

  const {
    searchParams,
    userList,
    page,
    total,
    limit,
    setPage,
    handleGetUsers,
    handleInput,
    handleSelectBox,
  } = useHandleUserList();

  const [userId, setUserId] = useState(null);

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  return (
    <ContentLayout>
      {/* <!-- 사용자 검색바 --> */}
      <SearchBar
        setUserId={setUserId}
        userList={userList}
        searchParams={searchParams}
        page={page}
        total={total}
        limit={limit}
        setPage={setPage}
        openModal={openModal}
        handleInput={handleInput}
        handleSelectBox={handleSelectBox}
        handleGetUsers={handleGetUsers}
      />

      {/* <!-- 사용자 목록 테이블 --> */}
      <UserTable
        setUserId={setUserId}
        userList={userList}
        page={page}
        total={total}
        limit={limit}
        setPage={setPage}
        openModal={openModal}
        closeModal={closeModal}
      />

      <AddUserModal
        modalRef={modalRef}
        closeModal={closeModal}
        userId={userId}
        setUserId={setUserId}
        handleGetUsers={handleGetUsers}
        mode={userId ? "modify" : "add"}
      />
    </ContentLayout>
  );
};

export default UserManagementPage;
