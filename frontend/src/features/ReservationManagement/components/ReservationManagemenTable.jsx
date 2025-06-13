import Tooltip from "../../../components/tooltip/Tooltip";

const ReservationManagemenTable = ({ title, data }) => {
  return (
    <div className="mb-10">
      <h3 className="mb-2 text-gray-800 text-xl font-semibold">
        {title} ({data.length})
      </h3>
      <table className="table">
        <thead>
          <tr>
            <th className="w-12">
              <input type="checkbox" className="checkbox" />
            </th>
            <th className="w-12">순번</th>
            <th className="w-20">방송</th>
            <th>방송명</th>
            <th className="w-1/12">점포</th>
            <th className="w-1/12">MD</th>
            <th className="w-[10%] wide:w-2/12">기간</th>
            <th className="w-1/12">방송시간</th>
            <th className="w-16">GAP</th>
            <th className="w-20">재생시간</th>
            <th className="w-20">반복횟수</th>
            <th className="w-20">반복간격</th>
            <th>등록자</th>
            <th>첨부파일</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>
                <input type="checkbox" className="checkbox" />
              </td>
              <td>{index + 1}</td>
              <td>{item.type}</td>
              <td className="truncate">
                <Tooltip id={item.id} content={item.title} />
              </td>
              <td>{item.store}</td>
              <td>{item.md}</td>
              <td>
                {item.startDate} ~ {item.endDate}
              </td>
              <td>
                {item.startTime} ~ {item.endTime}
              </td>
              <td>{item.gap}</td>
              <td>{item.playTime}초</td>
              <td>{item.repeatCount}회</td>
              <td>{item.repeatInterval}분</td>
              <td>{item.registrant}</td>
              <td className="truncate">
                <Tooltip id={item.id} content={item.file} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationManagemenTable;
