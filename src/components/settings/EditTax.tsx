import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
// import * as Yup from "yup";
import axiosRequest from "../../api/api";

interface Tax {
  _id: string;
  taxName: string;
  taxPercentage: number;
}

const EditTax: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [tax, setTax] = useState<Tax | null>(null);
  console.log(tax);
  
  const [formData, setFormData] = useState({
    _id: id,
    taxName: "",
    taxPercentage: 0,
  });
  // const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchTax = async () => {
      try {
        const config = {
          method: "get",
          url: `admin/settings/tax/${id}`,
        };

        const response: any = await axiosRequest(config);

        if (response?.data?.status === "success") {
          setTax(response.data.TaxData);
          setFormData({
            _id: response.data.TaxData._id,
            taxName: response.data.TaxData.taxName,
            taxPercentage: response.data.TaxData.taxPercentage,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchTax();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    try {
      const config = {
        method: "post",
        url: `admin/settings/edit-tax`,
        data: formData,
      };

      const response: any = await axiosRequest(config);

      if (response?.data?.status === "success") {
        // If the update is successful, navigate to settings page
        navigate("/settings");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const validationSchema = Yup.object().shape({
  //   taxName: Yup.string().required("Tax name is required"),
  //   taxPercentage: Yup.number()
  //     .required("Tax percentage is required")
  //     .min(0, "Tax percentage must be greater than or equal to 0")
  //     .max(100, "Tax percentage must be less than or equal to 100"),
  // });

  return (
    <div>
      <div className="p-6 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Edit Tax</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label
              htmlFor="taxName"
              className="block text-gray-700 font-bold mb-2"
            >
              Tax Name
            </label>
            <input
              id="taxName"
              name="taxName"
              type="text"
              value={formData.taxName}
              className="w-full lg:w-1/2 mt-1 p-2 block rounded-md border-gray-300"
              onChange={handleInputChange}
            />
            {/* {errors.taxName && (
              <div className="text-red-500">{errors.taxName}</div>
            )} */}
          </div>
          <div className="mb-4">
            <label
              htmlFor="taxPercentage"
              className="block text-gray-700 font-bold mb-2"
            >
              Tax Percentage
            </label>
            <input
              id="taxPercentage"
              name="taxPercentage"
              type="number"
              value={formData.taxPercentage}
              className="w-full lg:w-1/2 mt-1 p-2 block rounded-md border-gray-300"
              onChange={handleInputChange}
            />
            {/* {errors.taxPercentage && (
              <div className="text-red-500">{errors.taxPercentage}</div>
            )} */}
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
        </form>
      </div>
    </div>
  );
};

export default EditTax;
