import React, { useEffect, useRef, useState } from "react";
// import * as Yup from "yup";
import "react-image-crop/dist/ReactCrop.css";
import AvatarEditor from "react-avatar-editor";
import axiosRequest from "../../api/api";
import { useNavigate } from "react-router-dom";
// import { AxiosError } from "axios";

const AddChannel = () => {
  const [values, setValues] = useState({
    channelId: "",
    channelName: "",
    email: "",
    commission: "",
    currency: "",
  });

  const [currencylist, setCurrencyList] = useState([]);

  const [image, setImage] = useState<File | null>(null);
  const [cropImage, setCropImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [scale, setScale] = useState<number>(1);
  const editorRef = useRef<any>(null);
  const navigate = useNavigate();

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

    fetchCurrencyList();
  }, []);

  // const validationSchema = Yup.object().shape({
  //   channelId: Yup.string()
  //     .required("Channel ID is required")
  //     .min(4, "Channel ID must be at least 4 characters")
  //     .max(16, "Channel ID must be at most 16 characters"),
  //   channelName: Yup.string()
  //     .required("Channel name is required")
  //     .min(4, "Channel name must be at least 4 characters")
  //     .max(16, "Channel name must be at most 16 characters"),
  //   email: Yup.string().email("Invalid email").required("Email is required"),
  //   commission: Yup.number()
  //     .required("Commission is required")
  //     .min(0, "Commission must be at least 0%")
  //     .max(100, "Commission must be at most 100%"),
  //   currency: Yup.string().required("Currency type is required"),
  // });

  const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSelectChange1 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setImage(file);
          setImagePreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted with values:", values);
    const formData = new FormData();
    formData.append("channelId", values.channelId);
    formData.append("channelName", values.channelName);
    formData.append("email", values.email);
    formData.append("commission", values.commission);
    formData.append("currency", values.currency);
    if (cropImage) {
      console.log("formdata image append", cropImage);
      formData.append("logo", cropImage);
    } else {
      alert("There is no picture or u forgot to press crop");
      return null;
    }

    // console.log(formData);
    console.log(Object.fromEntries(formData));
    try {
      console.log("axios calling - ");
      // for (let pair of formData.entries()) {
      //   console.log(pair[0] + ", " + pair[1]);
      // }

      const config = {
        method: "post",
        url: "admin/add-channel",
        data: formData,
      };

      const response: any = await axiosRequest(config);

      console.log(response);

      if (response?.data?.status == "success") {
        alert("Channel added successfully");
        navigate("/channels");
      }
    } catch (error: any) {
      alert("Internal server issue");
      console.error("Error submitting form:", error);
    }
  };

  const handleCrop = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      const croppedImage = canvas.toDataURL("image/jpeg"); // You can change the format if needed
      console.log("Cropped image:", croppedImage);
      setCropImage(croppedImage);
      // Now you can use the 'croppedImage' as needed, such as uploading it to a server
    }
  };

  const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScale(parseFloat(e.target.value));
  };

  // useEffect(()=>{
  //   handleCrop()
  // },[scale])

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Add Channel</h1>

      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label
            htmlFor="channelId"
            className="block text-sm font-medium text-gray-700"
          >
            Channel ID
          </label>
          <input
            type="text"
            id="channelId"
            name="channelId"
            value={values.channelId}
            onChange={handleSelectChange}
            className="mt-1 p-2 block w-1/2 lg:w-1/2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="channelName"
            className="block text-sm font-medium text-gray-700"
          >
            Channel Name
          </label>
          <input
            type="text"
            id="channelName"
            name="channelName"
            value={values.channelName}
            onChange={handleSelectChange}
            className="mt-1 p-2 block w-1/2 lg:w-1/2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleSelectChange}
            className="mt-1 p-2 block w-1/2 lg:w-1/2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="commission"
            className="block text-sm font-medium text-gray-700"
          >
            Commission
          </label>
          <input
            type="number"
            id="commission"
            name="commission"
            value={values.commission}
            onChange={handleSelectChange}
            className="mt-1 p-2 block w-1/2 lg:w-1/2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="currency"
            className="block text-sm font-medium text-gray-700"
          >
            Currency Type
          </label>
          <select
         id="currency"
         name="currency"
         value={values.currency}
         onChange={handleSelectChange1 }
            className="mt-1 p-2 block w-1/2 lg:w-1/2 border border-gray-300 rounded-md"
          >
            <option value="">Select currency</option>
            {currencylist.map((currency:any) => (
              <option key={currency._id} value={currency.currencyName}>
                {currency.currencyName}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="logo"
            className="block text-sm font-medium text-gray-700"
          >
            Logo
          </label>
          <input
            type="file"
            id="logo"
            name="logo"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 p-2 block w-1/2 lg:w-1/2 border border-gray-300 rounded-md"
          />
          {image && (
            <div className="m-4 text-center flex-col">
              <AvatarEditor
                className="flex justify-start"
                ref={editorRef}
                image={imagePreview!}
                width={200}
                height={200}
                border={10}
                borderRadius={100}
                scale={scale}
              />
              <div className="flex-row flex justify-start m-4">
                <input
                  className="mr-2"
                  type="range"
                  min="1"
                  max="2"
                  step="0.01"
                  value={scale}
                  onChange={handleScaleChange}
                />
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleCrop}
                >
                  Crop
                </button>
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={() => navigate("/channels")}
          className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddChannel;
