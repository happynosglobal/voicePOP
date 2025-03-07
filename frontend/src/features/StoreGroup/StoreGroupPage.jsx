import React, { useRef } from "react";
import ContentLayout from "../../layout/ContentLayout";
import Title from "../../components/title/Title";
import Tooltip from "../../components/tooltip/Tooltip";
import Pagination from "../../components/pagination/Pagination";
import AddGroupModal from "./components/AddGroupModal";

const dummyGroup = [
  {
    id: 1,
    group_name: "1권역 (제주 제외)",
    groups: ["용산", "왕십리", "월계", "일산"],
    createdDate: "2024-12-01",
    creator: "홍길동",
    creatorID: "nicetoday1",
  },
  {
    id: 2,
    group_name: "수도권 전체",
    groups: [
      "가든5",
      "구로",
      "김포한강",
      "동탄",
      "마포",
      "목동",
      "미아",
      "산본",
      "서울(가든5)",
      "서울(구로)",
      "서울(목동)",
      "서울(미아)",
      "서울(성수)",
      "서울(왕십리)",
      "서울(월계)",
      "서울(은평)",
      "서울(자양)",
      "서울(창동)",
      "성남",
      "성수",
      "송파",
      "수원",
      "수지",
      "시화",
      "신도림",
      "안산",
      "안성",
      "양재",
      "여의도",
      "용인",
      "의정부",
      "이수",
      "일산",
      "점포없음",
      "창동",
      "천호",
      "청계천",
      "킨텍스",
      "파주",
      "평촌",
      "하남",
      "화정",
    ],
    createdDate: "2025-01-21",
    creator: "강현국",
    creatorID: "hyunguk11",
  },
  {
    id: 3,
    group_name: "에브리데이 충청권",
    groups: [
      "대전(둔산)",
      "대전(관저)",
      "대전(중리)",
      "천안(불당)",
      "천안(쌍용)",
      "천안(신부)",
      "세종(고운)",
      "세종(나성)",
      "청주(율량)",
      "청주(가경)",
      "충주",
      "아산(탕정)",
      "아산(배방)",
    ],
    createdDate: "2025-03-03",
    creator: "홍연숙",
    creatorID: "ghddustnr",
  },
  {
    id: 4,
    group_name: "수도권 외",
    groups: ["청주", "원주", "강릉"],
    createdDate: "2025-02-22",
    creator: "황수연",
    creatorID: "heysunny612",
  },
];

const StoreGroupPage = () => {
  const groupModalRef = useRef(null); // 점포 선택 모달 ref

  return (
    <ContentLayout>
      <div className="flex items-center justify-between">
        <Title text="점포 그룹 관리" />

        <button
          className="btn btn-sm btn-primary"
          onClick={() => groupModalRef.current.showModal()}
        >
          그룹 생성
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th className="w-14">순서</th>
            <th className="w-2/12">그룹명</th>
            <th className="w-1/12">점포수</th>
            <th>점포</th>
            <th className="w-2/12">생성일</th>
            <th className="w-2/12">생성자</th>
          </tr>
        </thead>
        {dummyGroup.length > 0 && (
          <tbody>
            {dummyGroup.map((item, index) => (
              <tr key={item.id} onClick={() => handleRowClick(item.id)}>
                <td>{dummyGroup.length - index}</td>
                <td>{item.group_name}</td>
                <td>{item.groups.length}</td>
                <td className="truncate">
                  <Tooltip id={item.id} content={item.groups} place="bottom" />
                </td>
                <td>{item.createdDate}</td>
                <td>
                  {item.creator} ({item.creatorID})
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {/* <EmptyState text="일치하는 검색 결과가 없습니다." /> */}
      {/* <EmptyState text="등록된 리스트가 없습니다." />  */}
      <Pagination />
      <AddGroupModal modalRef={groupModalRef} /> {/* 점포선택 모달 */}
    </ContentLayout>
  );
};

export default StoreGroupPage;
