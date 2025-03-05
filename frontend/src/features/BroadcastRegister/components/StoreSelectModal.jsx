const StoreSelectModal = ({ modalRef }) => {
  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box bg-white max-w-2xl">
        <h3 className="mb-6 pb-6 font-semibold text-lg border-b">점포선택</h3>
        TODO: 점포선택 트랜스퍼
        <form method="dialog">
          <div className="flex w-full items-center justify-center gap-2.5 mt-12">
            <button className="absolute right-3 top-4 w-10 h-10 text-2xl">
              ✕
            </button>
            <button className="btn min-w-24">취소</button>
            <button type="submit" className="btn btn-primary min-w-24">
              등록
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default StoreSelectModal;
