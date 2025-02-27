
const SearchBar = ({ openModal }) => {
    return (
        <div className="flex justify-between items-center mb-4">
            <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                    <label className="font-semibold">권한</label>
                    <select className="select select-bordered">
                        <option selected>전체</option>
                        <option>브랜드 관리자</option>
                        <option>광고 관리자</option>
                        <option>점포 관리자</option>
                    </select>
                </div>
                <div className="flex items-center gap-2">
                    <label className="font-semibold">브랜드</label>
                    <select className="select select-bordered">
                        <option selected>전체</option>
                        <option>이마트(EM)</option>
                        <option>에브리데이(ED)</option>
                    </select>
                </div>
                <div className="flex items-center gap-2">
                    <label className="font-semibold">검색</label>
                    <select className="select select-bordered">
                        <option selected>ID</option>
                        <option>성명</option>
                    </select>
                </div>
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="검색어를 입력해주세요."
                        className="input input-bordered input-md w-full max-w-xs"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <label className="font-semibold">상태</label>
                    <select className="select select-bordered">
                        <option selected>전체</option>
                        <option>승인</option>
                        <option>미승인</option>
                    </select>
                </div>
                <button className="btn btn-neutral">검색</button>
            </div>
            {/* <!-- 사용자 등록 버튼 --> */}
            <div className="text-right">
                <button className="btn btn-primary" onClick={openModal}>사용자 등록</button>
            </div>
        </div>
    )
}

export default SearchBar;