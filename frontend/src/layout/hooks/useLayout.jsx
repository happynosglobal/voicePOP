import { useMemo } from "react";
import { Route, useLocation } from "react-router-dom";
import useUserStore from "../../stores/user";
import { ROUTE_COMPONENTS, URL_MAPPING } from "../../utils/constant/urls";
import BroadcastRegisterPage from "../../features/BroadcastRegister/BroadcastRegisterPage";
import AdRegisterPage from "../../features/AdRegister/AdRegisterPage";

function useLayout() {
  const { user } = useUserStore();
  const location = useLocation();

  const routeElements = useMemo(() => {
    if (!user || !user?.menu) return [];

    return user.menu
      .filter((item) => item.type === "screen")
      .map((item) => {
        let Component = ROUTE_COMPONENTS[item.url];

        // 방송등록/광고등록 url의 경우 수정페이지 두개 생성
        if (item.url === URL_MAPPING.broadcastRegister) {
          return [
            <Route
              key={item.url}
              path={item.url}
              element={<BroadcastRegisterPage key="create" mode="create" title={item.name} />}
            />,
            <Route
              key={URL_MAPPING.broadcastEdit}
              path={URL_MAPPING.broadcastEdit}
              element={<BroadcastRegisterPage key="edit" mode="edit" title={"방송수정"}/>}
            />,
          ];
        } else if (item.url === URL_MAPPING.adRegister) {
          return [
            <Route
              key={item.url}
              path={item.url}
              element={<BroadcastRegisterPage key="create" mode="create" title={item.name} />}
            />,
            <Route
              key={URL_MAPPING.adEdit}
              path={URL_MAPPING.adEdit}
              element={<AdRegisterPage key="edit" mode="edit" title={"광고수정"} />}
            />,
          ];
        }

        return Component ? (
          <Route key={item.url} path={item.url} element={<Component title={item.name}/>} />
        ) : null;
      })
      .filter(Boolean);
  }, [user, location.state]);

  return { routeElements };
}

export default useLayout;
