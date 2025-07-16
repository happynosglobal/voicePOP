import Input from "../../../components/input/Input";
import {
  levelOptions,
  userStatusOptions,
} from "../../../utils/constant/options";
import useCodes from "../../../stores/codes";
import Dropdown from "../../../components/dropdown/Dropdown";

const SearchBar = ({
  setUserId,
  searchParams,
  setPage,
  openModal,
  handleInput,
  handleSelectBox,
  handleMultiSelectBox,
  handleGetUsers,
}) => {
  const { brandOptions } = useCodes();

  const userLevelOptions = [
    // { value: "", label: "모든 권한" },
    ...levelOptions,
  ];

  const userBrandOptions = [
    // { value: "", label: "모든 브랜드" },
    ...brandOptions,
  ];

  const keywordOptions = [
    { value: "user_id", label: "ID" },
    { value: "name", label: "성명" },
  ];

  const handleOnClick = () => {
    handleGetUsers(searchParams, 1);
    setPage(1);
  };

  return (
    <div className="flex mb-5 gap-1">
      <div className="flex justify-between w-full">
        <div className="flex flex-wrap items-center gap-1.5">
          <Dropdown
            name="level"
            className="min-w-44"
            options={userLevelOptions}
            value={userLevelOptions.find(
              (opt) => opt.value === searchParams.level
            )}
            onChange={handleSelectBox}
            isSearchable={false}
            isClearable={true}
            placeholder={"권한"}
          />
          <Dropdown
            name="brand_code"
            className="min-w-40"
            options={userBrandOptions}
            value={userBrandOptions.find(
              (opt) => opt.value === searchParams.brand_code
            )}
            onChange={handleSelectBox}
            isSearchable={false}
            isClearable={true}
            placeholder={"브랜드"}
          />
          <Dropdown
            isMulti
            name="status"
            className="min-w-40"
            options={userStatusOptions}
            value={userStatusOptions.filter((opt) =>
              searchParams.status.includes(opt.value)
            )}
            onChange={handleMultiSelectBox}
            isSearchable={false}
            isClearable={true}
            placeholder={"상태"}
          />
          <div className="mx-5 h-5 w-px bg-gray-300"></div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">검색 조건</label>
            <Dropdown
              name="keyword_type"
              options={keywordOptions}
              isClearable={false}
              className="min-w-32"
              onChange={handleSelectBox}
              isSearchable={false}
              defaultValue={keywordOptions?.[0]}
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
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleOnClick();
                }
              }}
            />
          </div>
          <button className="btn btn-accent btn-sm" onClick={handleOnClick}>
            검색
          </button>
        </div>
        <div className="flex gap-2">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              setUserId(null);
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
