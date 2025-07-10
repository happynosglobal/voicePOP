import ContentLayout from "../../layout/ContentLayout";
import DeviceStatusSection from "./components/DeviceStatusSection";
import LiveStatusChart from "./components/LiveStatusChart";
import ReservationSummary from "./components/ReservationSummary";
import BroadcastIssueChart from "./components/BroadcastIssueChart";
import UserRequestSummary from "./components/UserRequestSummary";

const DashboardPage = ({ title }) => {
  return (
    <ContentLayout title={title}>
      {/* 방송장비 현황 */}
      <DeviceStatusSection />

      <div className="flex gap-2.5 mt-2.5 h-[310px]">
        {/* 실시간 송출 현황 */}
        <LiveStatusChart />
        {/* 예약 내역 */}
        <ReservationSummary />
      </div>

      <div className="flex gap-2.5 mt-2.5">
        {/* 미송출 현황 */}
        <BroadcastIssueChart />

        {/* 사용자 관리 */}
        <UserRequestSummary />
      </div>
    </ContentLayout>
  );
};

export default DashboardPage;
