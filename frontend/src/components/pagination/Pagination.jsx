const Pagination = () => {
  return (
    <div className="flex justify-center mt-20">
      <div className="join">
        <button className="join-item btn btn-sm">«</button>
        <button className="join-item btn btn-sm">‹</button>

        <button className="join-item btn btn-sm">1</button>
        <button className="join-item btn btn-sm btn-active">2</button>
        <button className="join-item btn btn-sm">3</button>
        <button className="join-item btn btn-sm">4</button>
        <button className="join-item btn btn-sm">5</button>
        <button className="join-item btn btn-sm">›</button>
        <button className="join-item btn btn-sm">»</button>
      </div>
    </div>
  );
};

export default Pagination;
