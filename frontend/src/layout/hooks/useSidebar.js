import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useUserStore from "../../stores/user";

const useSidebar = () => {
    const { user } = useUserStore();
    const navigate = useNavigate();
    const location = useLocation();
    
    // 유정 정보에 menu의 type으로 매핑해서 메뉴 배열 생성
    const menu = useMemo(() => {
        if (!user || !user.menu) return [];

        const outlinkMenu = user.menu.find((item) => item.type === "outlink");
        const individualScreens = user.menu.filter((item) => item.type === "screen" && item.parent_code === 0);
        const folderMenus = user.menu.filter((item) => item.type === "folder");
        const screenMenus = user.menu.filter((item) => item.type === "screen" && item.parent_code !== 0);

        return [
            outlinkMenu,
            ...individualScreens,
            ...folderMenus.map(folder => ({
                ...folder,
                children: screenMenus.filter(screen => screen.parent_code === folder.code)
            }))
        ].filter(Boolean);
    }, [user]);

    const handleNavigation = (url, type) => {
        if (type === "outlink") {
            window.open(url, "_blank");
        } else {
            navigate(url);
        }
    };
    
    return { menu, handleNavigation, location };
};

export default useSidebar;