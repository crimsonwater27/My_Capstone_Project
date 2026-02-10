import React from "react";

const Filters = ({ onFilterChange }) => {
  return (
    <div>
      <select onChange={(e) => onFilterChange(e.target.value)}>
        <option value="">All Eras</option>
        <option value="ancient">Ancient</option>
        <option value="renaissance">Renaissance</option>
        <option value="modern">Modern</option>
      </select>
    </div>
  );
};

export default Filters;
