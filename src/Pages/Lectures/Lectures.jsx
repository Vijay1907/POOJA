import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useDynamicCrud from '../../hooks/useDynamicCrud';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import {PiNotePencilFill} from "react-icons/pi"
import {BsFillTrashFill} from "react-icons/bs"

function Lectures() {
  const { data, isLoading, isError, updateItem, deleteItem, updateError, deleteError } = useDynamicCrud("http://localhost:3000/api/v1/lectures");
  console.log(data);

  // State for update modal
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // State for delete confirmation
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);


  const openUpdateModal = (item) => {
    setSelectedItem(item);
    setShowUpdateModal(true);
  };

  const closeUpdateModal = () => {
    setSelectedItem(null);
    setShowUpdateModal(false);
  };

  const openDeleteConfirmation = (item) => {
    setItemToDelete(item);
    setShowDeleteConfirmation(true);
  };

  const closeDeleteConfirmation = () => {
    setItemToDelete(null);
    setShowDeleteConfirmation(false);
  };

  const handleDelete = async () => {
    if (itemToDelete) {
      await deleteItem(itemToDelete._id);
      closeDeleteConfirmation();
    }
  };

  return (
    <div className="">
      <ToastContainer />
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p className="text-red-500">Error loading data</p>
      ) : (
        <div>

<div className="bg-white">
      <>
          <Navbar title={"Lectures"} />
          <Sidebar />
          <div className="pl-24 pr-4">
          <div className="flex justify-between items-center m-4">
            <div className="text-end my-2">
              <input
                type="text"
                placeholder="Search by Name"
                className="input-bordered input-sm py-2 px-6 border border-black rounded"
                // value={searchTerm}
                // onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Link to='/add-lecture'>
            <button
              className="bg-purple-400 py-1 px-3 rounded font-semibold text-white"
            >
              Add Lecture
            </button></Link>
          </div>

          <div className="h-[calc(100vh-120px)] overflow-auto mt-2 ">
            <table className="w-[100%] border-collapse">
              {/* head */}
              <thead className="bg-purple-400 text-white sticky top-0">
                <tr>
                  <th>S.no.</th>
                  <th>Subject Name</th>
                  <th>Subject Description</th>
                  <th>Action</th>
                </tr>
              </thead>

              {/* body */}
              <tbody>
                {data?.lectures?.map((item, index) => (
                  <tr
                    className={
                      index % 2 === 1
                        ? "text-center bg-[#D4E6FF]"
                        : "text-center"
                    }
                    key={index}
                  >
                    <td className="py-1 items-center flex justify-center">
                      {index + 1}
                    </td>
                    <td>{item.subjectName}</td>
                    <td>{item.subjectDescription}</td>
                    <td className="flex items-center justify-center mt-2">
                      
                        <PiNotePencilFill  color="#50B412"
                          className="mx-2 cursor-pointer"
                          size="20"
                      onClick={() => openUpdateModal(item)}/>
                        <BsFillTrashFill color="#FF0000"
                        size="20"
                        className="cursor-pointer"
                       
                      onClick={() => deleteItem(item._id)}/>
                       
                      
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </div>

        </>
    </div>

          

          {showUpdateModal && selectedItem && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-4 w-96 rounded shadow">
                {/* Your update form elements */}
                <button onClick={closeUpdateModal} className="px-4 py-2 bg-gray-300 text-gray-800 rounded">
                  Cancel
                </button>
              </div>
            </div>
          )}
 
          {showDeleteConfirmation && itemToDelete && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-4 w-96 rounded shadow">
                <p>Are you sure you want to delete this item?</p>
                <div className="mt-4">
                  <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded mr-2">
                    Delete
                  </button>
                  <button onClick={closeDeleteConfirmation} className="px-4 py-2 bg-gray-300 text-gray-800 rounded">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Lectures;
