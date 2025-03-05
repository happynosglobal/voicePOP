import Select from "react-select";

const SearchBar = ({ openModal }) => {
  return (
    <div className="flex mb-5 gap-1">
      <div className="flex justify-between w-full">
        <div className="flex flex-wrap items-center gap-1.5">
          <Select
            options={[
              { value: "1", label: "브랜드 관리자" },
              { value: "2", label: "광고 관리자" },
              { value: "3", label: "점포 관리자" },
            ]}
            className="min-w-32"
            isClearable
            placeholder="모든 관리자"
          />

          <Select
            options={[
              { value: "1", label: "이마트(EM)" },
              { value: "2", label: "에브리데이(ED)" },
            ]}
            className="min-w-32"
            isClearable
            placeholder="모든 브랜드"
          />
          <Select
            options={[
              { value: "1", label: "승인" },
              { value: "2", label: "미승인" },
            ]}
            className="min-w-32"
            isClearable
            placeholder="모든 상태"
          />

          <div className="mx-5 h-5 w-px bg-gray-300"></div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">검색 조건</label>
            <Select
              options={[
                { value: "1", label: "ID" },
                { value: "2", label: "성명" },
              ]}
              isClearable={false}
              className="min-w-32"
              defaultValue={{ value: "1", label: "ID" }}
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="검색어를 입력해주세요."
              class="input input-bordered w-full focus:ring-0 focus:outline-none"
            />
          </div>

          <button className="btn btn-accent btn-sm">검색</button>
        </div>

        {/* <!-- 사용자 등록 버튼 --> */}
        <div className="text-right">
          <button className="btn btn-primary btn-sm" onClick={openModal}>
            사용자 등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
