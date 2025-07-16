import { useState } from "react";

const useSort = (onChange) => {
  const [sortOption, setSortOption] = useState({ sort: null, order: null });

  const toggleSort = (sortBy) => {
    if (sortOption.sort !== sortBy) {
      setSortOption({ sort: sortBy, order: "desc" });
      onChange(sortBy, "desc");
    } else if (sortOption.order === "desc") {
      setSortOption({ sort: sortBy, order: "asc" });
      onChange(sortBy, "asc");
    } else {
      setSortOption({ sort: null, order: null });
      onChange(null, null);
    }
  };

  return { sortOption, toggleSort };
};

export default useSort;
