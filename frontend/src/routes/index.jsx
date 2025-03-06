import { Route, Routes } from "react-router-dom";
import { URL_MAPPING } from "../utils/constant/urls";
import Login from "../features/Login/Login";
import SignUp from "../features/SignUp/SignUp";
import DefaultLayout from "../layout/DefaultLayout";
import UserManagementPage from "../features/UserManagement/UserManagementPage";
import AdApprovalPage from "../features/AdApproval/AdApprovalPage";
import AdCompanyRegisterPage from "../features/AdCompanyRegister/AdCompanyRegisterPage";
import AdRegisterPage from "../features/AdRegister/AdRegisterPage";
import AdSchedulePage from "../features/AdSchedule/AdSchedulePage";
import AdStatsPage from "../features/AdStats/AdStatsPage";
import AdStatusPage from "../features/AdStatus/AdStatusPage";
import BroadcastRegisterPage from "../features/BroadcastRegister/BroadcastRegisterPage";
import DashboardPage from "../features/Dashboard/DashboardPage";
import EquipmentManagementPage from "../features/EquipmentManagement/EquipmentManagementPage";
import EquipmentStatsPage from "../features/EquipmentStats/EquipmentStatsPage";
import EquipmentStatusPage from "../features/EquipmentStatus/EquipmentStatusPage";
import ReservationManagementPage from "../features/ReservationManagement/ReservationManagementPage";
import StoreGroupPage from "../features/StoreGroup/StoreGroupPage";
import useLayout from "../layout/hooks/useLayout";
import SelectBrand from "../features/Login/SelectBrand";

//route/index.jsx

/**
 * [로그인] - Login.jsx
 * [사용자 등록 신청] - Signup.jsx
 * [대시보드] - DashboardPage.jsx
 * [장비현황] - EquipmentStatusPage.jsx
 * [방송등록] - BroadcastRegisterPage.jsx
 * [예약관리] - ReservationManagementPage.jsx
 * [광고등록] - AdRegisterPage.jsx
 * [광고현황] - AdStatusPage.jsx
 * [광고스케줄] - AdSchedulePage.jsx
 * [사용자관리] - UserManagementPage.jsx
 * [장비관리] - EquipmentManagementPage.jsx
 * [점포그룹] - StoreGroupPage.jsx
 * [장비통계] - EquipmentStatsPage.jsx
 * [광고통계] - AdStatsPage.jsx
 * [광고업체등록] - AdCompanyRegisterPage.jsx
 * [광고승인] - AdApprovalPage.jsx
 */
function Root() {
  const { routes } = useLayout();
  return (
    <Routes>
      <Route index path={"/login"} element={<Login />} />
      <Route index path={"/login/select"} element={<SelectBrand />} />
      <Route path={"/signup"} element={<SignUp />} />
      <Route path="/" element={<DefaultLayout />}>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Route>
    </Routes>
  );
}

export default Root;

{
  /* <Routes>
<Route index path={"/login"} element={<Login />} />
<Route path={"/signup"} element={<SignUp />} />
<Route path="/" element={<DefaultLayout />}>
    <Route
        path={URL_MAPPING.dashboard}
        element={<DashboardPage />}
    />
    <Route
        path={URL_MAPPING.equipmentStatus}
        element={<EquipmentStatusPage />}
    />
    <Route
        path={URL_MAPPING.broadCastRegister}
        element={<BroadcastRegisterPage />}
    />
    <Route
        path={URL_MAPPING.reservationManagement}
        element={<ReservationManagementPage />}
    />



    <Route
        path={URL_MAPPING.adRegister}
        element={<AdRegisterPage />}
    />
    <Route
        path={URL_MAPPING.adstatus}
        element={<AdStatusPage />}
    />
    <Route
        path={URL_MAPPING.adSchedule}
        element={<AdSchedulePage />}
    />



    <Route
        path={URL_MAPPING.userManagement}
        element={<UserManagementPage />}
    />
    <Route
        path={URL_MAPPING.equipmentManagement}
        element={<EquipmentManagementPage />}
    />
    <Route
        path={URL_MAPPING.storeGroup}
        element={<StoreGroupPage />}
    />
    <Route
        path={URL_MAPPING.equipmentStats}
        element={<EquipmentStatsPage />}
    />
    <Route
        path={URL_MAPPING.adstats}
        element={<AdStatsPage />}
    />
    <Route
        path={URL_MAPPING.adCompanyRegister}
        element={<AdCompanyRegisterPage />}
    />
    <Route
        path={URL_MAPPING.adApproval}
        element={<AdApprovalPage />}
    />
</Route>
</Routes> */
}
