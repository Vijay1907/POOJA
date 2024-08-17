import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import moment from "moment";
import { GETUSERS } from "../../service";

function UserDetails() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllUser = async () => {
    try {
      setIsLoading(true);
     let response = await GETUSERS()
      setData(response?.data?.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(response?.error?.data?.message)
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "User Data");
    XLSX.writeFile(workbook, "user_data.xlsx");
  };

  return (
    <div className="">
      <>


        <div className="pl-8 pt-4 mt-4 pr-4">

          <div className="px-4 flex justify-between bg-gray-100 items-center ">
            <div className="flex justify-around bg-gray-100 py-4 space-x-4 px-4">
              <h2 className="text-2xl text-slate-500  ">Users</h2>
            </div>
            <div>
              <button onClick={downloadExcel} className="bg-purple-400 text-white px-4 py-2 rounded">
                Download Excel
              </button>
            </div>
          </div>
          <div className="h-[calc(60vh-120px)] overflow-auto mt-2 ">
            <table className="w-[100%] border-collapse">
              {/* head */}
              <thead className="bg-purple-400 text-white sticky top-0">
                <tr>
                  <th>S.no.</th>
                  <th>Email</th>
                  <th>SignIn Date</th>
                  {/* <th>Active</th> */}
                </tr>
              </thead>

              {/* body */}
              <tbody>
                {data?.map((item, index) => (
                  <tr
                    className={
                      index % 2 === 1
                        ? "text-center bg-[#D4E6FF]"
                        : "text-center"
                    }
                    key={index}
                  >
                    <td className="py-3 items-center flex justify-center">
                      {index + 1}
                    </td>
                    <td>{item?.email}</td>
                    <td>{moment(item?.signInDate).format("MMMM D, YYYY")}</td>
                    {/* <td className="text-center text-2xl text-blue-500  flex justify-center">
                      <Link to={`/view-userDetails/${item._id}`}>
                        <AiFillEye />
                      </Link>
                    </td> */}

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    </div>
  );
}

export default UserDetails;
