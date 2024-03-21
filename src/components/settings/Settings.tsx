import React, { useEffect, useState } from "react";
// import DataTable, { Column } from "react-data-table-component";
import DataTable  from "react-data-table-component";
import { TableColumn } from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import axiosRequest from "../../api/api";

interface Currency {
  _id: string;
  currencyName: string;
  currencyRate: number;
}

interface Tax {
  _id: string;
  taxName: string;
  taxPercentage: number;
}

const Settings: React.FC = () => {

  const navigate = useNavigate();

  const [taxList, setTaxList] = useState<Tax[]>([]);

  const [currencyList, setCurrencyList] = useState<Currency[]>([]);

  

  useEffect(() => {
    const fetchCurrencyList = async () => {
      try {
        const config = {
          method: "get",
          url: "admin/settings/currency-list",
        };

        const response: any = await axiosRequest(config);

        setCurrencyList(response.data.listCurrency);
      } catch (error) {
        console.error("Error fetching currency list:", error);
      }
    };

    const fetchTaxList = async () => {
      try {
        // Placeholder for fetching tax list''
        const config = {
          method: "get",
          url: "admin/settings/tax-list",
        };

        const response: any = await axiosRequest(config);

        setTaxList(response.data.taxes);
      } catch (error) {
        console.error("Error fetching tax list:", error);
      }
    };

    fetchCurrencyList();

    fetchTaxList();
  }, []);

  const handleCurrencyEdit = (row: Currency) => {
    // Handle currency edit logic
    navigate(`/settings/edit-currency/${row._id}`);
  };

  const handleCurrencyDelete = async (row: Currency) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Currency ?"
    );

    if (!confirmed) return;

    try {
      const config = {
        method: "delete",
        url: `admin/settings/currency/${row._id}`,
      };

      const response: any = await axiosRequest(config);

      console.log("Currency deleted successfully");

      setCurrencyList(response.data.listCurrency);

      alert("Currency deleted successfully");
    } catch (error) {
      console.error("Error :", error);
    }
  };

  const handleTaxEdit = (row: Tax) => {
    // Handle tax edit logic
    navigate(`/settings/edit-tax/${row._id}`);
  };

  const handleTaxDelete = async (row: Tax) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this tax?"
    );
    if (!confirmed) return;

    // Handle tax delete logic
    try {
      const config = {
        method: "delete",
        url: `admin/settings/tax/${row._id}`,
      };

      const response: any = await axiosRequest(config);
      setTaxList(response.data.listTaxs);

      console.log("Tax deleted successfully");
      alert("Tax deleted successfully");
    } catch (error) {
      console.error("Error :", error);
    }
  };

  const currencyData = currencyList.map((currency, index) => ({
    _id: currency._id,
    index: index + 1,
    currencyName: currency.currencyName,
    currencyRate: currency.currencyRate,
  }));

  const taxData = taxList.map((tax, index) => ({
    _id: tax._id,
    index: index + 1,
    taxName: tax.taxName,
    taxPercentage: tax.taxPercentage,
  }));

  const currencyColumns: TableColumn <Currency>[] = [
    { name: "Index", selector: ( _row:any,index: any) => index + 1 },
    { name: "Currency Type", selector: (row: any) => row.currencyName },
    { name: "Currency Rate", selector: (row: any) => row.currencyRate },
    {
      name: "Action",
      cell: (row: any) => (
        <div>
          <button
            onClick={() => handleCurrencyEdit(row)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Edit
          </button>
          <button
            onClick={() => handleCurrencyDelete(row)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const taxColumns: TableColumn <Tax>[] = [
    { name: "Index", selector: ( _row:any,index: any) => index + 1 },
    { name: "Tax Type", selector: (row: any) => row.taxName },
    { name: "Tax Percentage", selector: (row: any) => row.taxPercentage },
    {
      name: "Action",
      cell: (row: any) => (
        <div>
          <button
            onClick={() => handleTaxEdit(row)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Edit
          </button>
          <button
            onClick={() => handleTaxDelete(row)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="p-6 bg-gray-100 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {" "}
            Currency list{" "}
          </h1>
          <Link
            to="/settings/add-currency"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Add Currency
          </Link>
        </div>
        <div className="flex flex-col mt-10">
          <DataTable
            columns={currencyColumns}
            data={currencyData}
            pagination
            highlightOnHover
            responsive
          />
        </div>
      </div>
      <div className="p-6 bg-gray-100 rounded-lg shadow-md mt-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-4"> Tax list </h1>
          <Link
            to="/settings/add-tax"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Add Tax
          </Link>
        </div>
        <div className="flex flex-col mt-10">
          <DataTable
            columns={taxColumns}
            data={taxData}
            pagination
            highlightOnHover
            responsive
          />
        </div>
      </div>
    </>
  );
};

export default Settings;
