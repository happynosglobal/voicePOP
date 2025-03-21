import Select from "react-select";
import Input from "../../../components/input/Input";
import { RiFileExcel2Line } from "react-icons/ri";
import { levelOptions } from "../../../utils/constant/options";
import useBrandCode from "../../../hooks/useBrandCode";

const SearchBar = ({
  setUserId,
  userList,
  page,
  total,
  limit,
  searchParams,
  setPage,
  openModal,
  handleInput,
  handleSelectBox,
  handleGetUsers,
}) => {
  const { brandOptions } = useBrandCode();
  const handleOnClick = () => {
    handleGetUsers();
    setPage(1);
  }

  return (
    <div className="flex mb-5 gap-1">
      <div className="flex justify-between w-full">
        <div className="flex flex-wrap items-center gap-1.5">
          <Select
            name="level"
            options={[
              { value: "", label: "모든 관리자" },
              ...levelOptions
            ]}
            className="min-w-32"
            onChange={handleSelectBox}
            defaultValue={{ value: "", label: "모든 관리자" }}
          />

          <Select
            name="brand_code"
            options={[
              { value: "", label: "모든 브랜드" },
              ...brandOptions
            ]}
            className="min-w-32"
            onChange={handleSelectBox}
            defaultValue={{ value: "", label: "모든 브랜드" }}
          />
          <Select
            name="status"
            options={[
              { value: "", label: "모든 상태" },
              { value: "1", label: "승인" },
              { value: "2", label: "미승인" },
            ]}
            className="min-w-32"
            onChange={handleSelectBox}
            defaultValue={{ value: "", label: "모든 상태" }}
          />

          <div className="mx-5 h-5 w-px bg-gray-300"></div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">검색 조건</label>
            <Select
              name="keyword_type"
              options={[
                { value: "user_id", label: "ID" },
                { value: "user_name", label: "성명" },
              ]}
              isClearable={false}
              className="min-w-32"
              onChange={handleSelectBox}
              defaultValue={{ value: "1", label: "ID" }}
            />
          </div>
          <div className="flex items-center gap-2">
            <Input
              name="keyword"
              type="text"
              placeholder="검색어를 입력해주세요."
              className="input input-bordered w-full focus:ring-0 focus:outline-none"
              value={searchParams.keyword}
              onChange={handleInput}
            />
          </div>

          <button className="btn btn-accent btn-sm" onClick={handleOnClick}>검색</button>
        </div>

        {/* <!-- 사용자 등록 버튼 --> */}
        <div className="flex gap-2">
          <button className="btn btn-sm btn-success">
            <RiFileExcel2Line className="text-xl" /> 엑셀다운로드
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              setUserId("");
              openModal();
            }}
          >
            사용자 등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
