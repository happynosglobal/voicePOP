import Tooltip from "../../../components/tooltip/Tooltip";
import { toDate, toGapFormat, toTimeFormat } from "../../../utils/customFormat";
import EmptyState from "../../../components/emptyState/EmptyState";
import Pagination from "../../../components/pagination/Pagination";
import useCodes from "../../../stores/codes";
import { downloadBcMedia } from "../../../api/broadcast/broadcast";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../../utils/constant/messages";
import CheckBox from "../../../components/input/CheckBox";
import useUserStore from "../../../stores/user";

const BroadcastManagementTable = ({
  title,
  data,
  checkedBc,
  editableBcIds,
  handleCheckBox,
  handleAllCheckBox,
  navigateToEdit,
  limit,
  page,
  setPage,
  total,
}) => {
  const { user } = useUserStore();

  const allStoreCnt = useCodes((state) => state.storeByBrandCode)?.length;

  const getRowNumber = (index) => limit * (page - 1) + index + 1;

  const downloadAudio = async (id) => {
    if (!id) return;
    try {
      const response = await downloadBcMedia(id);
      const { media_file_url, media_file_name } = response.data.data;

      const audioResponse = await fetch(media_file_url);
      const blob = await audioResponse.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = media_file_name || "download_voice.mp3";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      const errMsg = getErrorMessage(err?.response?.data?.message);
      toast.error(errMsg);
      console.error(err);
    }
  };
  return (
    <div className="mb-10">
      <h3 className="mb-2 text-gray-800 text-xl font-semibold">
        {title} ({total})
      </h3>
      <table className="table">
        <thead>
          <tr>
            <th className="w-12">
              <CheckBox
                type="checkbox"
                className="checkbox"
                checked={
                  user?.level === "STORE"
                    ? data
                        .filter((item) => editableBcIds?.includes(item?.id))
                        .every((item) => checkedBc?.includes(item?.id))
                    : data.every((item) => checkedBc?.includes(item?.id))
                }
                onChange={(e) => handleAllCheckBox(data, e.target.checked)}
              />
            </th>
            <th className="w-12">순번</th>
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
                <CheckBox
                  type="checkbox"
                  className="checkbox"
                  checked={checkedBc.includes(item.id)}
                  onChange={(e) => handleCheckBox(item.id, e.target.checked)}
                  disabled={
                    !(
                      user?.level !== "STORE" ||
                      editableBcIds?.includes(item?.id)
                    )
                  }
                />
              </td>
              <td>{getRowNumber(index)}</td>
              <td>
                <div
                  className="truncate hover:underline cursor-pointer w-full"
                  onClick={() => navigateToEdit(item)}
                >
                  <Tooltip
                    id={item.id}
                    label={item.title}
                    content={item.title}
                  />
                </div>
              </td>
              <td>
                {item.stores?.length === allStoreCnt
                  ? "전 점포"
                  : item.stores?.length === 0
                  ? "-"
                  : item.stores?.length === 1
                  ? item.stores[0].store_name
                  : `${item.stores?.length}개점`}
              </td>
              <td>{item.category_type_name}</td>
              <td>
                {toDate(item.start_date)} ~ {toDate(item.end_date)}
              </td>
              <td>
                {toTimeFormat(item.start_time)} ~ {toTimeFormat(item.end_time)}
              </td>
              <td>{toGapFormat(item.gap)}</td>
              <td>{item.medias?.[0].play_time_seconds}초</td>
              <td>{item.repeat_count ? `${item.repeat_count}회` : "-"}</td>
              <td>{toGapFormat(item.repeat_interval)}</td>
              <td>{item.creater}</td>
              <td>
                <div
                  className="truncate hover:underline cursor-pointer w-full"
                  onClick={() => downloadAudio(item?.medias[0].id)}
                >
                  <Tooltip
                    id={item.id}
                    content={item.medias?.[0].media_filename}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <EmptyState text="일치하는 검색 결과가 없습니다." />
      )}
      <Pagination limit={limit} page={page} setPage={setPage} total={total} />
    </div>
  );
};

export default BroadcastManagementTable;
