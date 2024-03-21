import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import axiosRequest from "../../api/api";
import { useNavigate } from "react-router-dom";

interface Tax {
  taxName: string;
  taxPercentage: number;
}

const AddTax: React.FC = () => {

  const navigate = useNavigate();

  const initialValues: Tax = {
    taxName: "",
    taxPercentage: 0,
  };

  const validationSchema = Yup.object().shape({
    taxName: Yup.string().required("Tax name is required"),
    taxPercentage: Yup.number()
      .required("Tax percentage is required")
      .min(0, "Tax percentage must be greater than or equal to 0")
      .max(100, "Tax percentage must be less than or equal to 100"),
  });

  const handleSubmit = async (values: Tax) => {
    try {
      console.log(values);
      const config = {
        method: "post",
        url: "admin/settings/add-tax",
        data: values,
      };
      const response: any = await axiosRequest(config);

      if (response?.data?.status == "success") {
        alert("Tax added successfully");
        navigate("/settings")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="p-6 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Add Tax</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="taxName"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Tax Name
                </label>
                <Field
                  id="taxName"
                  name="taxName"
                  type="text"
                  className="w-full lg:w-1/2 mt-1 p-2 block rounded-md border-gray-300"
                />
                {errors.taxName && touched.taxName && (
                  <div className="text-red-500">{errors.taxName}</div>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="taxPercentage"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Tax Percentage
                </label>
                <Field
                  id="taxPercentage"
                  name="taxPercentage"
                  type="number"
                  className="w-full lg:w-1/2 mt-1 p-2 block rounded-md border-gray-300"
                />
                {errors.taxPercentage && touched.taxPercentage && (
                  <div className="text-red-500">{errors.taxPercentage}</div>
                )}
              </div>
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
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
};

export default AddTax;
