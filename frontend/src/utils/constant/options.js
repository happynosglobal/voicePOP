export const levelOptions = [
  { value: "ADMIN", label: "전체 관리자" },
  { value: "AD_ADMIN", label: "광고 관리자" },
  { value: "BROADCAST_ADMIN", label: "방송 관리자" },
  { value: "STORE", label: "점포 관리자" },
];

export const gapOptions = [
  // 1초 ~ 60초
  ...Array.from({ length: 60 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1}초`,
  })),
  // 2분 ~ 60분 (120초 ~ 3600초)
  ...Array.from({ length: 59 }, (_, i) => {
    const minute = i + 2;
    return {
      value: minute * 60,
      label: `${minute}분`,
    };
  }),
];

export const repeatOptions = Array.from({ length: 100 }, (_, i) => ({
  value: i + 1,
  label: `${i + 1}회`
}));

export const repeatInterval = [
  { value: 1, label: "1초" },
  { value: 3, label: "3초" },
  { value: 5, label: "5초" },
  { value: 10, label: "10초" },
  { value: 30, label: "30초" },
  ...Array.from({ length: 60 }, (_, i) => {
    const minute = i + 1;
    return { value: minute * 60, label: `${minute}분` };
  }),
];
