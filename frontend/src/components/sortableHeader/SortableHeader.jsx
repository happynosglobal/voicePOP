import React from "react";
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowUnsorted,
} from "react-icons/ti";

const SortableHeader = ({
  className,
  label,
  sortKey,
  sortOption,
  toggleSort,
}) => (
  <button onClick={() => toggleSort(sortKey)} className={className}>
    {label}
    {sortOption.sort === sortKey ? (
      sortOption.order === "desc" ? (
        <TiArrowSortedDown />
      ) : sortOption.order === "asc" ? (
        <TiArrowSortedUp />
      ) : null
    ) : (
      <TiArrowUnsorted />
    )}
  </button>
);
export default SortableHeader;
