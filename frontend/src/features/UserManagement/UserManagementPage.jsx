import { useRef, useState } from "react";
import useUserStore from "../../stores/user";
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import SearchBar from "./components/SearchBar";
import UserTable from "./components/UserTable";
import AddUserModal from "./components/AddUserModal";
import ContentLayout from "../../layout/ContentLayout";
import Title from "../../components/title/Title";

const UserManagementPage = () => {
  const modalRef = useRef();
  const { user } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  return (
    <LoadingSpinner isLoading={isLoading}>
      <ContentLayout>
        <Title text="사용자 관리" />

        {/* <!-- 사용자 검색바 --> */}
        <SearchBar openModal={openModal} />

        {/* <!-- 사용자 목록 테이블 --> */}
        <UserTable openModal={openModal} />

        {/* <!-- 모달 --> */}
        <AddUserModal modalRef={modalRef} />
      </ContentLayout>
    </LoadingSpinner>
  );
};

export default UserManagementPage;
