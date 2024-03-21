// EditForm.tsx

import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

interface Channel {
  _id: string;
  channelName: string;
  email: string;
  commission: number;
}

interface EditFormProps {
  editedData: Channel | null;
  onCancel: () => void;
  onSave: (editedData: Channel) => void;
}

const EditForm: React.FC<EditFormProps> = ({ editedData, onCancel, onSave }) => {
  // Define Yup validation schema
  const validationSchema = Yup.object().shape({
    channelName: Yup.string()
      .required("Channel name is required")
      .min(4, "Channel name must be at least 4 characters")
      .max(16, "Channel name must be at most 16 characters"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    commission: Yup.number()
      .required("Commission is required")
      .min(0, "Commission must be at least 0%")
      .max(100, "Commission must be at most 100%"),
  });

  // Initial form values
  const initialValues: Channel = {
    _id: "",
    channelName: "",
    email: "",
    commission: 0,
    ...editedData, // Populate initial values with data from editedData
  };

  // Handle form submission
  const onSubmit = (values: Channel) => {
    onSave(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form className="edit-form">
        <div className="mb-4">
          <label htmlFor="channelName" className="block text-sm font-medium text-gray-700">
            Channel Name
          </label>
          <Field
            type="text"
            id="channelName"
            name="channelName"
            className="mt-1 p-2 block w-1/2 border border-gray-300 rounded-md"
          />
          <ErrorMessage
            name="channelName"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <Field
            type="email"
            id="email"
            name="email"
            className="mt-1 p-2 block w-1/2 border border-gray-300 rounded-md"
          />
          <ErrorMessage
            name="email"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="commission" className="block text-sm font-medium text-gray-700">
            Commission
          </label>
          <Field
            type="number"
            id="commission"
            name="commission"
            className="mt-1 p-2 block w-1/2 border border-gray-300 rounded-md"
          />
          <ErrorMessage
            name="commission"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Save
        </button>
        <button type="button" onClick={onCancel} className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Cancel
        </button>
      </Form>
    </Formik>
  );
};

export default EditForm;
