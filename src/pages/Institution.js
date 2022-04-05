import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { CustomerService } from "../service/demo-ui/CustomerService";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { ProgressBar } from "primereact/progressbar";
import { Slider } from "primereact/slider";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import { classNames } from "primereact/utils";

const Institution = () => {
  const representatives = [
    { name: "Amy Elsner", image: "amyelsner.png" },
    { name: "Anna Fali", image: "annafali.png" },
    { name: "Asiya Javayant", image: "asiyajavayant.png" },
    { name: "Bernardo Dominic", image: "bernardodominic.png" },
    { name: "Elwin Sharvill", image: "elwinsharvill.png" },
    { name: "Ioni Bowcher", image: "ionibowcher.png" },
    { name: "Ivan Magalhaes", image: "ivanmagalhaes.png" },
    { name: "Onyama Limba", image: "onyamalimba.png" },
    { name: "Stephen Shaw", image: "stephenshaw.png" },
    { name: "XuXue Feng", image: "xuxuefeng.png" },
  ];

  const statuses = [
    "unqualified",
    "qualified",
    "new",
    "negotiation",
    "renewal",
    "proposal",
  ];

  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const [customers1, setCustomers1] = useState(null);
  const [filters1, setFilters1] = useState(null);

  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);

  const customerService = new CustomerService();

  const getCustomers = (data) => {
    return [...(data || [])].map((d) => {
      d.date = new Date(d.date);
      return d;
    });
  };

  const initFilters1 = () => {
    setFilters1({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      name: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      "country.name": {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      representative: { value: null, matchMode: FilterMatchMode.IN },
      date: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
      },
      balance: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      status: {
        operator: FilterOperator.OR,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
      verified: { value: null, matchMode: FilterMatchMode.EQUALS },
    });
  };

  useEffect(() => {
    setLoading2(true);

    customerService.getCustomersLarge().then((data) => {
      setCustomers1(getCustomers(data));
      setLoading1(false);
    });

    initFilters1();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const countryBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {/* <img
          alt="flag"
          src="assets/ui/images/flags/flag_placeholder.png"
          className={`flag flag-${rowData.country.code}`}
          width={30}
        /> */}
        <span
          style={{ marginLeft: ".5em", verticalAlign: "middle" }}
          className="image-text"
        >
          {rowData.country.name}
        </span>
      </React.Fragment>
    );
  };

  const filterClearTemplate = (options) => {
    return (
      <Button
        type="button"
        icon="pi pi-times"
        onClick={options.filterClearCallback}
        className="p-button-secondary"
      ></Button>
    );
  };

  const filterApplyTemplate = (options) => {
    return (
      <Button
        type="button"
        icon="pi pi-check"
        onClick={options.filterApplyCallback}
        className="p-button-success"
      ></Button>
    );
  };

  const representativeBodyTemplate = (rowData) => {
    const representative = rowData.representative;
    return (
      <React.Fragment>
        {/* <img
          alt={representative.name}
          src={`images/avatar/${representative.image}`}
          onError={(e) =>
            (e.target.src =
              "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
          }
          width={32}
          style={{ verticalAlign: "middle" }}
        /> */}
        <span
          style={{ marginLeft: ".5em", verticalAlign: "middle" }}
          className="image-text"
        >
          {representative.name}
        </span>
      </React.Fragment>
    );
  };

  const telefonoBodyTemplate = (rowData) => {
    const representative = rowData.representative;
    return (
      <React.Fragment>
        <span
          style={{ marginLeft: ".5em", verticalAlign: "middle" }}
          className="image-text"
        >
          + 57 320 00 00
        </span>
      </React.Fragment>
    );
  };

  const representativeFilterTemplate = (options) => {
    return (
      <>
        <div className="mb-3 text-bold">Agent Picker</div>
        <MultiSelect
          value={options.value}
          options={representatives}
          itemTemplate={representativesItemTemplate}
          onChange={(e) => options.filterCallback(e.value)}
          optionLabel="name"
          placeholder="Any"
          className="p-column-filter"
        />
      </>
    );
  };

  const representativesItemTemplate = (option) => {
    return (
      <div className="p-multiselect-representative-option">
        <img
          alt={option.name}
          src={`assets/ui/images/avatar/${option.image}`}
          width={32}
          style={{ verticalAlign: "middle" }}
        />
        <span
          style={{ marginLeft: ".5em", verticalAlign: "middle" }}
          className="image-text"
        >
          {option.name}
        </span>
      </div>
    );
  };

  const dateBodyTemplate = (rowData) => {
    return formatDate(rowData.date);
  };

  const dateFilterTemplate = (options) => {
    return (
      <Calendar
        value={options.value}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        dateFormat="mm/dd/yy"
        placeholder="mm/dd/yyyy"
        mask="99/99/9999"
      />
    );
  };

  const balanceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.balance);
  };

  const balanceFilterTemplate = (options) => {
    return (
      <InputNumber
        value={options.value}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        mode="currency"
        currency="USD"
        locale="en-US"
      />
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <span className={`customer-badge status-${rowData.status}`}>
        {rowData.status}
      </span>
    );
  };

  const statusFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        itemTemplate={statusItemTemplate}
        placeholder="Select a Status"
        className="p-column-filter"
        showClear
      />
    );
  };

  const formatDate = (value) => {
    return value.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const statusItemTemplate = (option) => {
    return <span className={`customer-badge status-${option}`}>{option}</span>;
  };

  const activityBodyTemplate = (rowData) => {
    return (
      <ProgressBar
        value={rowData.activity}
        showValue={false}
        style={{ height: ".5rem" }}
      ></ProgressBar>
    );
  };

  const activityFilterTemplate = (options) => {
    return (
      <React.Fragment>
        <Slider
          value={options.value}
          onChange={(e) => options.filterCallback(e.value)}
          range
          className="m-3"
        ></Slider>
        <div className="flex align-items-center justify-content-between px-2">
          <span>{options.value ? options.value[0] : 0}</span>
          <span>{options.value ? options.value[1] : 100}</span>
        </div>
      </React.Fragment>
    );
  };

  const verifiedBodyTemplate = (rowData) => {
    return (
      <i
        className={classNames("pi", {
          "text-green-500 pi-check-circle": rowData.verified,
          "text-pink-500 pi-times-circle": !rowData.verified,
        })}
      ></i>
    );
  };

  const verifiedFilterTemplate = (options) => {
    return (
      <TriStateCheckbox
        value={options.value}
        onChange={(e) => options.filterCallback(e.value)}
      />
    );
  };

  return (
    <div className="grid table-demo">
      <div className="col-12">
        <div className="card">
          <h5>Instituciones</h5>
          <DataTable
            value={customers1}
            paginator
            className="p-datatable-gridlines"
            showGridlines
            rows={10}
            dataKey="id"
            filters={filters1}
            filterDisplay="menu"
            loading={loading1}
            responsiveLayout="scroll"
            emptyMessage="No customers found."
          >
            <Column
              field="name"
              header="Nombre"
              filter
              filterPlaceholder="Search by name"
              style={{ minWidth: "12rem" }}
            />
            <Column
              header="Direccion"
              filterField="country.name"
              style={{ minWidth: "12rem" }}
              body={countryBodyTemplate}
              filter
              filterPlaceholder="Search by country"
              filterClear={filterClearTemplate}
              filterApply={filterApplyTemplate}
            />
            <Column
              header="Telefono"
              filterField="country.name"
              style={{ minWidth: "12rem" }}
              body={telefonoBodyTemplate}
              filter
              filterPlaceholder="Search by country"
              filterClear={filterClearTemplate}
              filterApply={filterApplyTemplate}
            />
            <Column
              header="Observaciones"
              filterField="representative"
              showFilterMatchModes={false}
              filterMenuStyle={{ width: "14rem" }}
              style={{ minWidth: "14rem" }}
              body={representativeBodyTemplate}
              filter
              filterElement={representativeFilterTemplate}
            />
            {/* <Column
              header="Date"
              filterField="date"
              dataType="date"
              style={{ minWidth: "10rem" }}
              body={dateBodyTemplate}
              filter
              filterElement={dateFilterTemplate}
            />
            <Column
              header="Balance"
              filterField="balance"
              dataType="numeric"
              style={{ minWidth: "10rem" }}
              body={balanceBodyTemplate}
              filter
              filterElement={balanceFilterTemplate}
            />
            <Column
              field="status"
              header="Status"
              filterMenuStyle={{ width: "14rem" }}
              style={{ minWidth: "12rem" }}
              body={statusBodyTemplate}
              filter
              filterElement={statusFilterTemplate}
            />
            <Column
              field="activity"
              header="Activity"
              showFilterMatchModes={false}
              style={{ minWidth: "12rem" }}
              body={activityBodyTemplate}
              filter
              filterElement={activityFilterTemplate}
            />
            <Column
              field="verified"
              header="Verified"
              dataType="boolean"
              bodyClassName="text-center"
              style={{ minWidth: "8rem" }}
              body={verifiedBodyTemplate}
              filter
              filterElement={verifiedFilterTemplate}
            /> */}
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default Institution;
