import { useState } from 'react';
import { getStoreCodes } from '../api/brand/brand';

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
      const stores = data.map(store => {
        return { value: store.id, label: store.name }
      });
      // setStores(data);

      // group_id가 있는 점포들 필터링
      const groupedStores = data.filter(store => store.group_id);

      // regionalGroupTypes와 매핑하여 그룹화
      const regionalGroupData = regionalGroupTypes.map(group => {
        const children = groupedStores
          .filter(store => store.group_id === group.value)
          .map(store => ({ value: store.id + "_" + group.value, label: store.name }));

        return children.length > 0 ? { ...group, children } : null;
      }).filter(Boolean); // null 값 제거

      // setRegionalGroup(regionalGroupData);
      return { stores, regionalGroupData }
    }
  } catch (err) {
    console.error(err);
  }
};



// 사용자 로그인시에 사용자 정보 중 brand_code로 brand별 store를 조회해 캐싱해서 홈페이지에서 사용하기위한 훅이다
// 점포 조회(group_id로 어느 권역에 포함된 점포인지 판단)
// group_id는 G1, G2, G3, G4 4개가 있고 각각 권역 1~4 이다.
// 점포마다 group_id는 배정돼있을 수도, 없을 수도 있다.
// getRegionalGroupStores의 응답 data로 온 모든 점포는 stores에 할당
// getRegionalGroupStores의 응답 data 중 group_id가 있는 점포는 regionalGroup에 할당
// getRegionalGroupStores의 응답 data의 group_id(data.group_id)와 regionalGroupTypes의 value를 맵핑해 오브젝트를 만든다
// 예를 들면 { value: "G1", label: "권역1", children: [{value: "1001", label: "EM상주점"}, {value: "1002", label: "EM상동점"}] }, 이런식으로
// value: "G1", label: "권역1" 같이 group_id에 따른 ui에 표시해줄 label은 regionalGroupTypes에 정의해둬서 api에 다른 group_id가 추가될 경우에 클라이언트에서 추가해 사용 가능하게 만든다
// getRegionalGroupStores의 응답 data 중 모두 group_id가 regionalGroupTypes의 value들과 매핑되는 게 없으면 빈배열로 놔두면 된다
// 일부만 일치하면 매핑되는 데이터가 있는 group만 만들어 regionalGroup에 할당하면 된다
// stores, regionalGroup, customGroup 는 state로 관리할까?
// 위의 조건들로 로직짜