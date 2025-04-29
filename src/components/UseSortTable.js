
import { useMemo, useState } from "react";

export default function useSortableTable(data, defaultKey = null) {
  const [sortConfig, setSortConfig] = useState({
    key: defaultKey,
    direction: "asc",
  });

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;
    return [...data].sort((a, b) => {
        const valA = a[sortConfig.key];
        const valB = b[sortConfig.key];
        
        if (!isNaN(valA) && !isNaN(valB)) {
          return sortConfig.direction === "asc" ? valA - valB : valB - valA;
        }
        
        const strA = valA?.toString().toLowerCase() ?? "";
        const strB = valB?.toString().toLowerCase() ?? "";
        if (strA < strB) return sortConfig.direction === "asc" ? -1 : 1;
        if (strA > strB) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
        
    });
  }, [data, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const getSortIcon = (key) => {
    const isActive = sortConfig.key === key;
    return (
      <span style={{ opacity: isActive ? 1 : 0.3, marginLeft: "4px" }}>
        {isActive && sortConfig.direction === "asc" ? "▲" : "▼"}
      </span>
    );
  };

  return { sortedData, handleSort, getSortIcon, sortConfig };
}
