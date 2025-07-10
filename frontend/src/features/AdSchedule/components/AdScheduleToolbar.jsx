import Select from "react-select";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import "react-big-calendar/lib/css/react-big-calendar.css";
import useCodes from "../../../stores/codes";
import CustomDatePicker from "../../../components/customDatePicker/CustomDatePicker";
import Tab from "../../../components/tab/Tab";
import Dropdown from "../../../components/dropdown/Dropdown";

const AdScheduleToolbar = ({
  label,
  date,
  onNavigate,
  user,
  activeTab,
  setActiveTab,
  searchParams,
  setSearchParams,
  setDate,
}) => {
  const { storeByBrandCode } = useCodes();

  const storeOptions =
    user?.level === "STORE"
      ? [{ value: user?.store_code, label: user?.store_name }]
      : [...storeByBrandCode];

  const handleSelectBox = (option, meta) => {
    const { name } = meta;
    const value = option ? option.value : "";
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="flex items-center gap-4 px-4 py-2 mb-2 bg-gray-100 rounded-lg text-gray-700">
        <button onClick={() => onNavigate("PREV")}>
          <AiOutlineLeft className="mr-2" />
        </button>
        <div className="w-40">
          <CustomDatePicker selectedDate={date} onChange={setDate} />
        </div>
        <button onClick={() => onNavigate("NEXT")}>
          <AiOutlineRight className="ml-2" />
        </button>
        <button
          onClick={() => onNavigate("TODAY")}
          className="btn btn-sm btn-accent"
        >
          오늘
        </button>
        <div className="flex flex-wrap items-center gap-1.5">
          <Dropdown
            name="str_code"
            options={storeOptions}
            className="min-w-64"
            value={storeOptions.find(
              (opt) => opt.value === searchParams.str_code
            )}
            onChange={(option, meta) => {
              if (user?.level !== "STORE") handleSelectBox(option, meta);
            }}
            isClearable={true}
            isDisabled={user?.level === "STORE"}
            placeholder={"점포 검색"}
          />
        </div>
      </div>

      <Tab
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onTabChange={(code) => {
          setSearchParams((prev) => ({
            ...prev,
            category_code: code,
          }));
        }}
      />
    </>
  );
};

export default AdScheduleToolbar;
