import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axiosRequest from "../../api/api";

interface Currency {
  _id: string;
  currencyName: string;
  currencyRate: number;
}

const EditCurrency = () => {
  
  const navigate = useNavigate();
  const { id } = useParams();
  const [currency, setCurrency] = useState<Currency | null>(null);
  const [formData, setFormData] = useState({
    _id: id,
    currencyName: "",
    currencyRate: 0,
  });

  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        const config = {
          method: "get",
          url: `admin/settings/currency/${id}`,
        };

        const response: any = await axiosRequest(config);

        if (response?.data?.status === "success") {
          setCurrency(response.data.CurrencyData);
          // Set initial form data when currency data is fetched
          setFormData({
            _id: response.data.CurrencyData._id,
            currencyName: response.data.CurrencyData.currencyName,
            currencyRate: response.data.CurrencyData.currencyRate,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCurrency();
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
        url: `admin/settings/edit-currency`,
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

  return (
    <>
      <div className="p-6 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Edit Currency</h1>
        {currency && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="currencyName"
                className="block text-sm font-medium text-gray-700"
              >
                Currency Name
              </label>
              <input
                id="currencyName"
                name="currencyName"
                type="text"
                value={formData.currencyName}
                onChange={handleInputChange}
                className="w-full md:w-1/2 lg:w-1/2 mt-1 p-2 block rounded-md border-gray-300"
              />
            </div>

            <div>
              <label
                htmlFor="currencyRate"
                className="block text-sm font-medium text-gray-700"
              >
                Currency Rate
              </label>
              <input
                id="currencyRate"
                name="currencyRate"
                type="number"
                value={formData.currencyRate}
                onChange={handleInputChange}
                className="w-full md:w-1/2 lg:w-1/2 mt-1 p-2 block rounded-md border-gray-300"
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
          </form>
        )}
      </div>
    </>
  );
};

export default EditCurrency;
