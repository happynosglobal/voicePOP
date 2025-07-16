export const getAccessToken = () => {
  return sessionStorage.getItem("access");
};

export const getRefreshToken = () => {
  return sessionStorage.getItem("refresh");
};

// 리프레시 토큰으로 토큰 재인증
export const getNewAccessToken = async (instance) => {
  const refreshToken = getRefreshToken();

  const { data } = await instance.post("/auth/refresh", {
    refresh_token: refreshToken,
  });

  const newAccessToken = data.data.token;
  sessionStorage.setItem("access", newAccessToken);
};
