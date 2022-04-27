import { InputText } from "primereact/inputtext";
import React from "react";

const SearchTable = ({ filter }) => {
  return (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <span className="block mt-2 md:mt-0 p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => filter(e.target.value)}
          placeholder="Buscar..."
        />
      </span>
    </div>
  );
};

export default SearchTable;
