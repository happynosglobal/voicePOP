import { useEffect, useRef, useState } from "react";
import SearchBar from "./components/SearchBar";
import UserTable from "./components/UserTable";
import AddUserModal from "./components/AddUserModal";
import ContentLayout from "../../layout/ContentLayout";
import useHandleUserList from "./hooks/useHandleUserList";
import LoadingSpinner from "../../components/loading/LoadingSpinner";

const UserManagementPage = ({ title }) => {
  const modalRef = useRef();

  const {
    searchParams,
    userList,
    page,
    total,
    limit,
    setPage,
    handleGetUsers,
    handleMultiSelectBox,
    handleInput,
    handleSelectBox,
    handleSort,
  } = useHandleUserList();

  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);

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
    <ContentLayout title={title}>
      {/* <!-- 사용자 검색바 --> */}
      <SearchBar
        setUserId={setUserId}
        searchParams={searchParams}
        setPage={setPage}
        openModal={openModal}
        handleInput={handleInput}
        handleSelectBox={handleSelectBox}
        handleMultiSelectBox={handleMultiSelectBox}
        handleGetUsers={handleGetUsers}
      />

      {/* <!-- 사용자 목록 테이블 --> */}
      <UserTable
        setUserId={setUserId}
        setUserData={setUserData}
        userList={userList}
        page={page}
        total={total}
        limit={limit}
        setPage={setPage}
        openModal={openModal}
        closeModal={closeModal}
        handleSort={handleSort}
        handleGetUsers={handleGetUsers}
      />

      <AddUserModal
        modalRef={modalRef}
        closeModal={closeModal}
        userId={userId}
        setUserId={setUserId}
        userData={userData}
        setUserData={setUserData}
        handleGetUsers={handleGetUsers}
        mode={userId ? "modify" : "add"}
      />
      <LoadingSpinner includeCodesLoading={true} />
    </ContentLayout>
  );
};

export default UserManagementPage;
