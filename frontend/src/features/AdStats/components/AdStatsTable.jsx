const AdStatsTable = ({ title, data }) => {
  return (
    <div className="mb-10">
      <h3 className="mb-2 text-gray-800 text-xl font-semibold">
        {title} ({data.length})
      </h3>
      <table className="table">
        <thead>
          <tr>
            <th>MD</th>
            <th>등록광고수</th>
            <th>목표계약구좌</th>
            <th>송출횟수</th>
            <th>달성율</th>
            <th>계약금액(합계)</th>
            <th>광고수익(합계)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.md}</td>
              <td>{item.adCount.toLocaleString()}</td>
              <td className="wide:text-base text-sm">
                {item.contractTarget.toLocaleString()}
              </td>
              <td>{item.broadcasts.toLocaleString()}</td>
              <td>
                <div className="relative w-full flex wide:gap-0 gap-1 items-center justify-between">
                  <progress
                    className="progress w-3/4"
                    value={item.achievementRate}
                    max="100"
                  ></progress>
                  <p className="text-right text-sm w-1/4">
                    {item.achievementRate}%
                  </p>
                </div>
              </td>
              <td>{item.contractAmount.toLocaleString()}</td>
              <td>{item.adRevenue.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>계</td>
            <td>2</td>
            <td>1,300</td>
            <td>800</td>
            <td>
              <div className="relative w-full flex wide:gap-0 gap-1 items-center justify-between">
                <progress
                  className="progress w-3/4"
                  value={60}
                  max="100"
                ></progress>
                <p className="text-right text-sm w-1/4">60%</p>
              </div>
            </td>
            <td>40,000</td>
            <td>24,000</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default AdStatsTable;
