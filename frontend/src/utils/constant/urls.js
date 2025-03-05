import AdApprovalPage from "../../features/AdApproval/AdApprovalPage";
import AdCompanyRegisterPage from "../../features/AdCompanyRegister/AdCompanyRegisterPage";
import AdRegisterPage from "../../features/AdRegister/AdRegisterPage";
import AdSchedulePage from "../../features/AdSchedule/AdSchedulePage";
import AdStatsPage from "../../features/AdStats/AdStatsPage";
import AdStatusPage from "../../features/AdStatus/AdStatusPage";
import BroadcastRegisterPage from "../../features/BroadcastRegister/BroadcastRegisterPage";
import DashboardPage from "../../features/Dashboard/DashboardPage";
import EquipmentManagementPage from "../../features/EquipmentManagement/EquipmentManagementPage";
import EquipmentStatsPage from "../../features/EquipmentStats/EquipmentStatsPage";
import EquipmentStatusPage from "../../features/EquipmentStatus/EquipmentStatusPage";
import ReservationManagementPage from "../../features/ReservationManagement/ReservationManagementPage";
import StoreGroupPage from "../../features/StoreGroup/StoreGroupPage";
import UserManagementPage from "../../features/UserManagement/UserManagementPage";

export const URL_MAPPING = {
    login: '/login',

    dashboard: '/dashboard',
    equipmentStatus: '/equipment-status',
    broadCastRegister: '/broadcast-register',
    reservationManagement: '/reservation-management',

    adRegister: '/advertisement/resiter',
    adstatus: '/advertisement/status',
    adSchedule: '/advertisement/schedule',

    userManagement: '/manager/user-management',
    equipmentManagement: '/manager/equipment-management',
    storeGroup: '/manager/store-group',
    equipmentStats: '/manager/equipment-stats',
    adstats: '/manager/ad-stats',
    adCompanyRegister: '/manager/ad-company-resiter',
    adApproval: '/manager/ad-approval',
};

export const ROUTE_COMPONENTS = {
    "/dashboard": DashboardPage,
    "/equipment-status": EquipmentStatusPage,
    "/broadcast-register": BroadcastRegisterPage,
    "/reservation-management": ReservationManagementPage,
    "/advertisement/resiter": AdRegisterPage,
    "/advertisement/status": AdStatusPage,
    "/advertisement/schedule": AdSchedulePage,
    "/manager/user-management": UserManagementPage,
    "/manager/equipment-management": EquipmentManagementPage,
    "/manager/store-group": StoreGroupPage,
    "/manager/equipment-stats": EquipmentStatsPage,
    "/manager/ad-stats": AdStatsPage,
    "/manager/ad-company-resiter": AdCompanyRegisterPage,
    "/manager/ad-approval": AdApprovalPage,
};
