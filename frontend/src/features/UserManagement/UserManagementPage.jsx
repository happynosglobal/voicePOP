import { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import Pagination from "../../components/pagination/Pagination";
import useUserStore from "../../stores/user";
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import SearchBar from "./components/SearchBar";
import UserTable from "./components/UserTable";
import AddUserModal from "./components/AddUserModal";

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
			<div className="pl-48 pt-16 flex h-screen">
				<div className="flex-1 p-4 h-full">
					<div className="bg-white p-6 rounded-lg shadow h-full">
						<h2 className="text-2xl font-bold mb-4">사용자 관리</h2>
						{/* <!-- 사용자 검색바 --> */}
						<SearchBar openModal={openModal} />

						{/* <!-- 사용자 목록 테이블 --> */}
						<UserTable openModal={openModal} />
					</div>

					{/* <!-- 모달 --> */}
					<AddUserModal modalRef={modalRef} />
				</div>
			</div>
		</LoadingSpinner>
	)
}

export default UserManagementPage;