import { useMemo } from "react";
import useUserStore from "../../stores/user";
import { ROUTE_COMPONENTS } from "../../utils/constant/urls";

function useLayout(){
    const { user } = useUserStore();

    const routes = useMemo(() => {
        if (!user || !user.menu) return [];

        return user.menu
            .filter((item) => item.type === "screen") // screen 타입 메뉴만 필터링
            .map((item) => {
                const Component = ROUTE_COMPONENTS[item.url]; // URL로 컴포넌트 매핑
                return Component ? { path: item.url, element: <Component /> } : null;
            })
            .filter(Boolean);
    }, [user]);

    return { routes };
};

export default useLayout;