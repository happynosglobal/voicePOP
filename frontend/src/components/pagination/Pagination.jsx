import React from "react";

const Pagination = ({ page, total, limit, setPage, block = 5 }) => {
  const totalPages = Math.ceil(total / limit);

  const halfBlock = Math.floor(block / 2);

  let startPage = page - halfBlock;
  let endPage = page + halfBlock;

  // 앞 범위 초과시 보정
  if (startPage < 1) {
    startPage = 1;
    endPage = Math.min(block, totalPages);
  }

  // 뒤 범위 초과시 보정
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, totalPages - block + 1);
  }

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className="flex justify-center mt-20">
      <div className="join">
        <button
          className="join-item btn btn-sm"
          onClick={() => handlePageChange(1)}
          disabled={page === 1}
        >
          «
        </button>
        <button
          className="join-item btn btn-sm"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          ‹
        </button>

        {pageNumbers.map((p) => (
          <button
            key={p}
            className={`join-item btn btn-sm ${page === p ? "btn-active" : ""}`}
            onClick={() => handlePageChange(p)}
          >
            {p}
          </button>
        ))}

        <button
          className="join-item btn btn-sm"
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          ›
        </button>
        <button
          className="join-item btn btn-sm"
          onClick={() => handlePageChange(totalPages)}
          disabled={page === totalPages}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default Pagination;
