import Pagination from "../../../components/pagination/Pagination";

const UserTable = ({ openModal }) => {
	return (
		<div className="overflow-x-auto">
			<table className="table table-zebra w-full">
				<thead className="bg-gray-100 boreder-t border-t-2">
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
				<tbody>
					<tr className="hover">
						<td>1</td>
						<td>
							<button
								onClick={openModal}
								className="hover:underline"
							>
								clickhereID
							</button>
						</td>
						<td>홍길동</td>
						<td>브랜드 관리자</td>
						<td>EM</td>
						<td>전점</td>
						<td className="text-green-500">승인</td>
						<td>2025-01-01</td>
						<td>2025-01-01</td>
					</tr>
					<tr className="hover">
						<td>2</td>
						<td>minsuki</td>
						<td>이길동</td>
						<td>광고 관리자</td>
						<td>ED</td>
						<td>전점</td>
						<td className="text-green-500">승인</td>
						<td>2025-01-01</td>
						<td>2025-01-01</td>
					</tr>
					<tr className="hover">
						<td>3</td>
						<td>221112</td>
						<td>박길동</td>
						<td>광고 관리자</td>
						<td>EM</td>
						<td>전점</td>
						<td className="text-red-500">미승인</td>
						<td>2025-01-01</td>
						<td>2025-01-01</td>
					</tr>
					<tr className="hover">
						<td>3</td>
						<td>12345</td>
						<td>홍길동</td>
						<td>브랜드 관리자</td>
						<td>EM</td>
						<td>전점</td>
						<td className="text-green-500">승인</td>
						<td>2025-01-01</td>
						<td>2025-01-01</td>
					</tr>
					<tr className="hover">
						<td>4</td>
						<td>minsuki</td>
						<td>이길동</td>
						<td>광고 관리자</td>
						<td>ED</td>
						<td>전점</td>
						<td className="text-green-500">승인</td>
						<td>2025-01-01</td>
						<td>2025-01-01</td>
					</tr>
					<tr className="hover">
						<td>5</td>
						<td>221112</td>
						<td>박길동</td>
						<td>광고 관리자</td>
						<td>EM</td>
						<td>전점</td>
						<td className="text-red-500">미승인</td>
						<td>2025-01-01</td>
						<td>2025-01-01</td>
					</tr>
				</tbody>
			</table>

			{/* <!--페이지 네이션 --> */}
			<Pagination />
		</div>
	)
}

export default UserTable;