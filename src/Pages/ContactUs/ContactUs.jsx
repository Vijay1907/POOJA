import {AiFillEye} from "react-icons/ai"
import { Link } from "react-router-dom";
import moment from "moment";
import { privateRequest } from "../../configs/RequestMethod";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const ContactUs = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    const getAllContacts = async () => {
      try {
        setIsLoading(true);
        const response = await privateRequest.get("/users/contacts");
        setData(response?.data?.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
        getAllContacts();
    }, []);
  return (
    <div>
        <Sidebar/>
        <Navbar title={"Contact Us"}/>
        <div className="h-[calc(60vh-120px)] overflow-auto mt-2 ml-20 mr-8 mt-4">

            <table className="w-[100%] border-collapse">
              {/* head */}
              <thead className="bg-purple-400 text-white sticky top-0">
                <tr>
                  <th>S.no.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Message</th>
                  <th>Mobile No</th>
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
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.subject}</td>
                    <td>{item.message}</td>
                    <td>{item.mobileNo}</td>
                   

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
    </div>
  )
}

export default ContactUs