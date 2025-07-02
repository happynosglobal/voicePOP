import { format } from "date-fns";
import { useEffect } from "react";
import { downloadBcMedia } from "../../../api/broadcast/broadcast";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../../utils/constant/messages";

const AdEventDetailModal = ({
  selectedEvent,
  setSelectedEvent,
  modalRef,
  onClose,
}) => {

  const downloadAudio = async () => {
    if (!selectedEvent?.mediaId) return;
    const id = selectedEvent.mediaId;
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
  
  /* 모달창 닫을 때 수행 할 로직 */
  useEffect(() => {
    const modal = modalRef?.current;
    if (!modal) return;

    const handleClose = () => {
      setSelectedEvent(null);
    };

    modal.addEventListener("close", handleClose);

    return () => {
      modal.removeEventListener("close", handleClose);
    };
  }, [modalRef]);
  return (
    <dialog className="modal" ref={modalRef}>
      <div className="modal-box bg-white max-w-lg">
        <h3 className="font-semibold text-lg mb-4 border-b pb-4">
          방송 상세 정보
        </h3>

        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <span className="font-semibold">방송명</span>
            <span className="text-right break-all max-w-[80%]">
              {selectedEvent.title}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">MD</span>
            <span className="text-right break-all max-w-[80%]">
              {selectedEvent.categoryLabel}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">시작 시간</span>
            <span>{format(selectedEvent.start, "HH:mm:ss")}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">종료 시간</span>
            <span>{format(selectedEvent.end, "HH:mm:ss")}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">재생 시간</span>
            <span>{selectedEvent.playTimeSeconds ?? 0}초</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Gap</span>
            <span>{selectedEvent.gap ? `${selectedEvent.gap}초` : "없음"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">파일명</span>
            <span
              className={`text-right break-all max-w-[80%] ${
                selectedEvent.mediaId ? "hover:underline cursor-pointer" : ""
              }`}
              onClick={selectedEvent.mediaId ? downloadAudio : undefined}
            >
              {selectedEvent.mediaFilename}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">대상 점포</span>
            <span className="text-right break-al">
              {selectedEvent.stores.length}개 점포
            </span>
          </div>
        </div>

        <div className="mt-4">
          {selectedEvent.stores && selectedEvent.stores.length > 0 ? (
            <>
              <div className="max-h-56 overflow-y-scroll border p-2 rounded-md text-sm bg-gray-50">
                {selectedEvent.stores.map((i, idx) => (
                  <span key={idx}>
                    {i.store_name}
                    {idx !== selectedEvent.stores.length - 1 && ", "}
                  </span>
                ))}
              </div>
            </>
          ) : (
            <span className="text-sm text-gray-400">점포 정보 없음</span>
          )}
        </div>

        <div className="flex justify-center gap-2 mt-8">
          <button className="btn min-w-24" onClick={onClose}>
            닫기
          </button>
        </div>

        <button
          className="absolute right-3 top-4 w-10 h-10 text-2xl"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </dialog>
  );
};

export default AdEventDetailModal;
