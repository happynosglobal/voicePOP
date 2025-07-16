import { Route, Routes, useNavigate } from "react-router-dom";
import { URL_MAPPING } from "../utils/constant/urls";
import Login from "../features/Login/Login";
import SignUp from "../features/SignUp/SignUp";
import DefaultLayout from "../layout/DefaultLayout";
import useLayout from "../layout/hooks/useLayout";
import EquipmentSettingPage from "../features/EquipmentSetting/EquipmentSettingPage";
import NotFoundPage from "../features/NotFound/NotFoundPage";
import ForgotPassword from "../features/ForgotPassword/ForgotPassword";
import ChangePassword from "../features/ChangePassword/ChangePassword";
import { useEffect } from "react";
import useUserStore from "../stores/user";

//route/index.jsx

/**
 * [로그인] - Login.jsx
 * [사용자 등록 신청] - Signup.jsx
 * [대시보드] - DashboardPage.jsx
 * [장비현황] - EquipmentStatusPage.jsx
 * [방송등록] - BroadcastRegisterPage.jsx
 * [예약관리] - BroadcastManagementPage.jsx
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
  const { routeElements } = useLayout();
  const navigate = useNavigate();
  const { user } = useUserStore();

  useEffect(() => {
    const publicPaths = [
      URL_MAPPING.login,
      URL_MAPPING.signUp,
      URL_MAPPING.resetPw,
      URL_MAPPING.changePw,
      URL_MAPPING.equipmentSetting,
    ];
    const currentPath = window.location.pathname;

    if (!user && !publicPaths.includes(currentPath)) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <Routes>
      <Route index path={URL_MAPPING.login} element={<Login />} />
      <Route path={URL_MAPPING.signUp} element={<SignUp />} />
      <Route path={URL_MAPPING.resetPw} element={<ForgotPassword />} />
      <Route path={URL_MAPPING.changePw} element={<ChangePassword />} />
      <Route path={URL_MAPPING.equipmentSetting} element={<EquipmentSettingPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/" element={<DefaultLayout />}>
        {routeElements}
      </Route>
    </Routes>
  );
}

export default Root;
