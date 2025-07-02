import ContentLayout from "../../layout/ContentLayout";
import BroadcastManagementTable from "./components/BroadcastManagementTable";
import Tab from "../../components/tab/Tab";
import { useEffect, useState } from "react";
import Dropdown from "../../components/dropdown/Dropdown";
import useBroadcastManagement from "./hooks/useBroadcastManagement";

const BroadcastManagementPage = () => {
  const {
    user,
    today,
    limit,
    liveTotal,
    setLiveTotal,
    livePage,
    setLivePage,
    scheduledTotal,
    setScheduledTotal,
    scheduledPage,
    setScheduledPage,
    storeOptions,
    checkedBc,
    setCheckedBc,
    searchParams,
    setSearchParams,
    liveBroadcasts,
    setLiveBroadcasts,
    scheduledBroadcasts,
    setScheduledBroadcasts,
    handleSelectBox,
    handleCheckBox,
    handleAllCheckBox,
    handleGetBcList,
    handleDeleteBc,
    navigateToEdit,
    navigateToEditById,
  } = useBroadcastManagement();

  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    setLivePage(1);
    setScheduledPage(1);
  }, [searchParams]);

  useEffect(() => {
    handleGetBcList("live", livePage);
  }, [livePage, searchParams]);

  useEffect(() => {
    handleGetBcList("scheduled", scheduledPage);
  }, [scheduledPage, searchParams]);

  useEffect(() => {
    setCheckedBc([]);
  }, [liveBroadcasts, scheduledBroadcasts]);

  return (
    <ContentLayout>
      <div className="flex mb-5 gap-1">
        <div className="flex justify-between w-full">
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
              isDisabled={user?.level === "STORE"}
            />
          </div>
          <div className="flex items-start gap-2">
            <button
              className="btn btn-sm btn-primary w-20"
              onClick={navigateToEditById}
              disabled={checkedBc.length !== 1 ? true : false}
            >
              수정
            </button>
            <button
              className="btn btn-sm btn-error  w-20"
              onClick={handleDeleteBc}
              disabled={checkedBc.length === 0 ? true : false}
            >
              삭제
            </button>
          </div>
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

      <div className="mt-6">
        <BroadcastManagementTable
          title="방송중"
          data={liveBroadcasts}
          checkedBc={checkedBc}
          handleCheckBox={handleCheckBox}
          handleAllCheckBox={handleAllCheckBox}
          navigateToEdit={navigateToEdit}
          limit={limit}
          page={livePage}
          setPage={setLivePage}
          total={liveTotal}
        />
        <BroadcastManagementTable
          title="예약완료"
          data={scheduledBroadcasts}
          checkedBc={checkedBc}
          handleCheckBox={handleCheckBox}
          handleAllCheckBox={handleAllCheckBox}
          navigateToEdit={navigateToEdit}
          limit={limit}
          page={scheduledPage}
          setPage={setScheduledPage}
          total={scheduledTotal}
        />
      </div>
    </ContentLayout>
  );
};

export default BroadcastManagementPage;
