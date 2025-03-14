import { useEffect, useRef, useState } from "react";
import useUserStore from "../../stores/user";
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import SearchBar from "./components/SearchBar";
import UserTable from "./components/UserTable";
import AddUserModal from "./components/AddUserModal";
import ContentLayout from "../../layout/ContentLayout";
import Title from "../../components/title/Title";
import useHandleUserList from "./hooks/useHandleUserList";

const UserManagementPage = () => {
  const modalRef = useRef();
  const { user } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);

  const {
    searchParams,
    userList,
    page,
    total,
    limit,
    setPage,
    handleGetUsers,
    handleInput,
    handleSelectBox
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
    <LoadingSpinner isLoading={isLoading}>
      <ContentLayout>
        <Title text="사용자 관리" />

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

        {/* <!-- 모달 --> */}
        <AddUserModal
          modalRef={modalRef}
          closeModal={closeModal}
          userId={userId}
          setUserId={setUserId}
          mode={userId ? "modify" : "add"}
        />
      </ContentLayout>
    </LoadingSpinner>
  );
};

export default UserManagementPage;