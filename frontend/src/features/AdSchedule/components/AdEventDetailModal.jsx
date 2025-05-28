import { format } from "date-fns";
import Tooltip from "../../../components/tooltip/Tooltip";

const AdEventDetailModal = ({ selectedEvent, modalRef, onClose }) => {
  if (!selectedEvent) return null;

  return (
    <dialog className="modal" ref={modalRef}>
      <div className="modal-box bg-white max-w-md">
        <h3 className="font-semibold text-lg mb-4 border-b pb-4">
          방송 상세 정보
        </h3>

        <div className="flex flex-col gap-3 text-sm">
          <div className="flex justify-between">
            <span className="font-semibold">방송명</span>
            <span className="text-right break-all max-w-[60%]">
              {selectedEvent.title}
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
            <span className="text-right break-all max-w-[60%]">
              {selectedEvent.mediaFilename}
            </span>
          </div>
        </div>

        <div className="mt-6">
          <span className="font-semibold block mb-1">대상 점포</span>
          {selectedEvent.stores && selectedEvent.stores.length > 0 ? (
            <>
              <Tooltip
                id="target-stores"
                content={selectedEvent.stores.map((i) => i.store_name)}
                place="bottom"
              />
              <span className="text-xs text-gray-500 mt-1 block">
                총 {selectedEvent.stores.length}개 점포
              </span>
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