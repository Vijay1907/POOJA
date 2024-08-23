import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import moment from "moment";
import { GETUSERS } from "../../service";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";

const UserDetails = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch users data with pagination
  const getAllUser = async (page = 1) => {
    try {
      setIsLoading(true);
      const response = await GETUSERS(page, 10); // Adjust the parameters based on your API
      setData(response?.data?.users || []);
      setTotalPages(response?.data?.totalPages || 1);
      setPage(response?.data?.page || 1);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllUser(page);
  }, [page]);

  const downloadExcel = async () => {
    try {
      setIsLoading(true);
      const response = await GETUSERS();
      let data = response?.data?.users || [];

      const formattedData = data.map(user => ({
        USER_ID: user._id,
        NAME: user.name ? user.name : '',
        EMAIL: user.email,
        MOBILE_NO: user.phone,
        'SIGIN DATE': moment(user.created_at).format('MMMM D, YYYY')
      }));

      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'User Data');
      XLSX.writeFile(workbook, 'user_data.xlsx');
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || 'Failed to download data');
    } finally {
      setIsLoading(false);
    }
  };


  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 mx-1 rounded ${i === page ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="pl-8 py-4 mt-4 pr-4">
      <div className="px-4 flex justify-between bg-gray-100 items-center">
        <div className="flex justify-around bg-gray-100 py-4 space-x-4 px-4">
          <h2 className="text-2xl text-slate-500">Users</h2>
        </div>
        <div>
          <button onClick={downloadExcel} className="bg-purple-400 text-white px-4 py-2 rounded">
            Download Excel
          </button>
        </div>
      </div>

      <div className="overflow-auto mt-2">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader /> {/* Ensure this is a spinner or similar loader */}
          </div>
        ) : data.length > 0 ? (
          <div className="max-h-[80vh] overflow-auto"> {/* Adjust max-height as needed */}
            <table className="w-full border-collapse">
              <thead className="bg-purple-400 text-white sticky top-0">
                <tr>
                  <th>S.no.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile No.</th>
                  <th>SignIn Date</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr
                    className={index % 2 === 1 ? "text-center bg-[#D4E6FF]" : "text-center"}
                    key={item._id}
                  >
                    <td className="py-3 items-center flex justify-center">
                      {(page - 1) * 10 + index + 1}
                    </td>
                    <td>{item?.name || "-"}</td>
                    <td>{item?.email || "-"}</td>
                    <td>{item?.phone || "-"}</td>
                    <td>{moment(item?.created_at).format("MMMM D, YYYY")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-3">No users found</div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {totalPages > 1 && renderPagination()}
      </div>
    </div>
  );
}

export default UserDetails;
