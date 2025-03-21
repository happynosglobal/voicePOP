import { useState } from 'react';
import { getStoreCodes } from '../api/storeGroup/storeGroup';

const regionalGroupTypes = [
  { value: 'G1', label: '권역1' },
  { value: 'G2', label: '권역2' },
  { value: 'G3', label: '권역3' },
  { value: 'G4', label: '권역4' },
];

export const getRegionalGroupStores = async (brand_code) => {
  try {
    const response = await getStoreCodes({ store_type: brand_code });
    const { code, data } = response.data;

    if (code === '0000' && Array.isArray(data)) {
      // 그룹없이 개별 점포 목록 세팅
      const allStores = data.map(store => {
        return { value: store.id, label: store.name }
      });

      // group_id가 있는 점포들 필터링
      const groupedStores = data.filter(store => store.group_id);

      // group_id가 없는 점포들 필터링
      const nonRegionalData = data
        .filter(store => !store.group_id)
        .map(store => {
          return { value: store.id, label: store.name }
        });


      // regionalGroupTypes와 매핑하여 그룹화
      const regionalGroupData = regionalGroupTypes.map(group => {
        const children = groupedStores
          .filter(store => store.group_id === group.value)
          .map(store => ({ value: store.id, label: store.name }));
          // .map(store => ({ value: store.id + "_" + group.value, label: store.name }));

        return children.length > 0 ? { ...group, children } : null;
      }).filter(Boolean);

      return { allStores, regionalGroupData, nonRegionalData }
    }
  } catch (err) {
    alert("점포 정보를 불러오는데 실패했습니다.");
    console.error(err);
  }
};
