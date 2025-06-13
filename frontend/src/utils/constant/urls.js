import AdApprovalPage from "../../features/AdApproval/AdApprovalPage";
import AdCompanyRegisterPage from "../../features/AdCompanyRegister/AdCompanyRegisterPage";
import AdRegisterPage from "../../features/AdRegister/AdRegisterPage";
import AdSchedulePage from "../../features/AdSchedule/AdSchedulePage";
import AdStatsPage from "../../features/AdStats/AdStatsPage";
import AdStatusPage from "../../features/AdStatus/AdStatusPage";
import BroadcastRegisterPage from "../../features/BroadcastRegister/BroadcastRegisterPage";
import DashboardPage from "../../features/Dashboard/DashboardPage";
import EquipmentManagementPage from "../../features/EquipmentManagement/EquipmentManagementPage";
import EquipmentSettingPage from "../../features/EquipmentSetting/EquipmentSettingPage";
import EquipmentStatsPage from "../../features/EquipmentStats/EquipmentStatsPage";
import EquipmentStatusPage from "../../features/EquipmentStatus/EquipmentStatusPage";
import ReservationManagementPage from "../../features/ReservationManagement/ReservationManagementPage";
import StoreGroupPage from "../../features/StoreGroup/StoreGroupPage";
import UserManagementPage from "../../features/UserManagement/UserManagementPage";
 
export const URL_MAPPING = {
  login: "/login",
  signUp: "/signup",
  resetPw: "/help/pw/reset",
  changePw: "/help/pw/change",
 
  equipmentStatus: "/broadcast/device-status",
  broadCastRegister: "/broadcast/register",
  reservationManagement: "/broadcast/management",
  adSchedule: "/broadcast/schedule",
 
  adRegister: "/advertisement/resiter",
  adstatus: "/advertisement/status",
 
  dashboard: "/status",
  userManagement: "/manager/user-management",
  equipmentManagement: "/manager/equipment-management",
  storeGroup: "/manager/store-group",
  equipmentStats: "/manager/equipment-stats",
  adstats: "/manager/ad-stats",
  adCompanyRegister: "/manager/ad-company-resiter",
  adApproval: "/manager/ad-approval",
 
  equipmentSetting: "equipment-setting",
};
 
export const ROUTE_COMPONENTS = {
  [URL_MAPPING.dashboard]: DashboardPage,
  [URL_MAPPING.equipmentStatus]: EquipmentStatusPage,
  [URL_MAPPING.broadCastRegister]: BroadcastRegisterPage,
  [URL_MAPPING.reservationManagement]: ReservationManagementPage,
  [URL_MAPPING.adRegister]: AdRegisterPage,
  [URL_MAPPING.adstatus]: AdStatusPage,
  [URL_MAPPING.adSchedule]: AdSchedulePage,
  [URL_MAPPING.userManagement]: UserManagementPage,
  [URL_MAPPING.equipmentManagement]: EquipmentManagementPage,
  [URL_MAPPING.storeGroup]: StoreGroupPage,
  [URL_MAPPING.equipmentStats]: EquipmentStatsPage,
  [URL_MAPPING.adstats]: AdStatsPage,
  [URL_MAPPING.adCompanyRegister]: AdCompanyRegisterPage,
  [URL_MAPPING.adApproval]: AdApprovalPage,
  [URL_MAPPING.equipmentSetting]: EquipmentSettingPage,
};
 