import React from "react";

const Filter = ({ filterName, filterNames }) => (
  <div>
    filter shown with <input value={filterName} onChange={filterNames} />
  </div>
);

export default Filter;
