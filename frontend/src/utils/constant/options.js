export const levelOptions = [
  { value: "ADMIN", label: "전체 관리자" },
  { value: "AD_ADMIN", label: "광고 관리자" },
  { value: "BROADCAST_ADMIN", label: "방송 관리자" },
  { value: "STORE", label: "점포 관리자" },
];

export const gapOptions = Array.from({ length: 61 }, (_, i) => ({
  value: i,
  label: i
}));

export const repeatOptions = Array.from({ length: 100 }, (_, i) => ({
  value: i + 1,
  label: i + 1
}));

export const repeatInterval = Array.from({ length: 61 }, (_, i) => ({
  value: i,
  label: i
}));