// import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import axiosRequest from "../../api/api";
import { showToast, ToastTypes } from "../toastComponent/toast";

interface Currency {
  currencyName: string;
  currencyRate: number;
}

const AddCurrency = () => {
  const navigate = useNavigate();

  const initialValues: Currency = {
    currencyName: "",
    currencyRate: 0,
  };

  const validationSchema = Yup.object({
    currencyName: Yup.string().required("Currency name is required"),
    currencyRate: Yup.number()
      .required("Currency rate is required")
      .positive("Currency rate must be a positive number"),
  });

  const onSubmit = async (values: Currency) => {
    try {
      console.log(values);

      const config = {
        method: "post",
        url: "admin/settings/add-currency",
        data: values,
      };

      const response: any = await axiosRequest(config);

      if (response?.data?.status == "success") {
        showToast("Currency added successfully", ToastTypes.SUCCESS);
        // alert("Channel added successfully");
        navigate("/settings");
      }
    } catch (error) {
      alert("Internal server issue");

      console.log(error);
    }
  };

  return (
    <>
      <div className="p-6 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Add Currency</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="space-y-4">
            <div>
              <label
                htmlFor="currencyName"
                className="block text-sm font-medium text-gray-700"
              >
                Currency Name
              </label>
              <Field
                id="currencyName"
                name="currencyName"
                type="text"
                className=" w-full md:w-1/2 lg:w-1/2 mt-1 p-2 block  rounded-md border-gray-300"
              />
              <ErrorMessage
                name="currencyName"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label
                htmlFor="currencyRate"
                className="block text-sm font-medium text-gray-700"
              >
                Currency Rate
              </label>
              <Field
                id="currencyRate"
                name="currencyRate"
                type="number"
                className="w-full md:w-1/2 lg:w-1/2 mt-1 p-2 block  rounded-md border-gray-300"
              />
              <ErrorMessage
                name="currencyRate"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>

              <Link
                to="/settings"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
              >
                Cancel
              </Link>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default AddCurrency;
