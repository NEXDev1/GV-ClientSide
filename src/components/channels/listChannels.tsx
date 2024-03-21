import  { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import axiosRequest from "../../api/api";

interface Channel {
  channelName: any;
  _id: string;
  name: string;
  email: string;
  commission: number;
}

const ChannelList = () => {
  const [channels, setChannels] = useState<Channel[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          method: "get",
          url: "admin/channels",
        };

        const response: any = await axiosRequest(config);
        setChannels(response.data.listChannels);
      } catch (error) {
        console.error("Error fetching channels:", error);
      }
    };

    fetchData();
  }, []);
  console.log(channels);

  const columns: TableColumn<Channel>[] = [
    { name: "Index", selector: ( _row:any,index: any) => index + 1 },
    { name: "Name", selector: (row: { name: any }) => row.name },
    { name: "E-mail", selector: (row: { email: any }) => row.email },
    {
      name: "Commission %",
      selector: (row: { commission: any }) => row.commission,
    },
    {
      name: "Action",
      cell: (row: Channel) => (
        <div>
          <button onClick={() => handleEdit(row)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
            Edit
          </button>
          <button onClick={() => handleDelete(row)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Delete
          </button>
        </div>
      ),
    },
  ];

  const data = channels.map((channel, index) => ({
    _id: channel._id,
    index: index + 1,
    name: channel.channelName,
    channelName: channel.channelName,
    email: channel.email,
    commission: channel.commission,
  }));

  const handleEdit = (row: Channel) => {
    // Handle edit action
    console.log("Edit row:", row);
    navigate(`/channels/edit-channel/${row._id}`);
  };

  const handleDelete = async (row: Channel) => {
    const confirmed = window.confirm("Are you sure you want to delete this Channel ?")
    if (!confirmed) return;
    try {
      const config = {
        method: "delete",
        url: `admin/channel/${row._id}`,
        // data: row._id,
      };

      const response: any = await axiosRequest(config);

      setChannels(response.data.listChannels);

      console.log("Channel deleted successfully");
      alert("Channel deleted successfully");
    } catch (error) {
      console.error("Error deleting channel:", error);
    }
  };

  return (
    <>
      <div className="p-6 bg-gray-100 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Channels List</h1>

          <Link to="/channels/add-channel" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
            Add Channel
          </Link>
        </div>
        <div className="flex flex-col mt-10">
          <DataTable columns={columns} data={data} pagination highlightOnHover responsive />
        </div>
      </div>
    </>
  );
};

export default ChannelList;
