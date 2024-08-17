import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsPencilSquare, BsFillTrashFill } from "react-icons/bs";
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { toast } from 'react-toastify';
import { DELETEDHYAAN, GETDHYAAN } from '../../service';
import DeleteDhyaan from './DeleteDhyaan';
import Description from '../../components/Description';

const Dhyaan = () => {
  const [dhyaanList, setDhyaanList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDhyaan, setSelectedDhyaan] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    getAllDhyaan();
  }, []);

  const getAllDhyaan = async () => {
    try {
      setIsLoading(true);
      const response = await GETDHYAAN();
      setDhyaanList(response?.data?.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch dhyaan");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteDhyaan = async (id) => {
    try {
      let response = await DELETEDHYAAN(id);
      getAllDhyaan();
      setIsDeleteModalOpen(false);
      toast.success(response?.data?.message);
    } catch (error) {
      console.log(error);
      toast.error(respone?.error?.data?.message);
    }
  };

  const handleEditClick = (dhyaan) => {
    navigate('/edit-dhyaan', { state: { dhyaan } });
  };


  const handleDeleteClick = (dhyaan) => {
    setSelectedDhyaan(dhyaan);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = (id) => {
    deleteDhyaan(id);
  };

  return (
    <div>
      <Navbar title="Dhyaan" />
      <Sidebar />
      <div className="p-6 ml-10">
        <div className="flex justify-end mb-4">
          <Link to='/add-dhyaan'>
            <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
              Add Dhyaan
            </button>
          </Link>
        </div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ml-5">
            {dhyaanList?.map((dhyaan, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                <div className='flex items-center justify-center'>
                  <img src={dhyaan.dhyaanPoster} alt={dhyaan.dhyaanName} className="h-[180px] object-contain mt-3" />
                </div>
                <div className="p-4 pb-2">
                  <hr className="border-gray-300 mb-3" />
                  <h3 className="text-lg font-semibold mb-2">{dhyaan.dhyaanName}</h3>
                  <Description description={dhyaan.dhyaanDescription} />
                  {/* <p className="text-gray-600 text-sm mb-4">{dhyaan.dhyaanDescription}</p> */}
                  <div className="flex gap-x-12 items-center">
                    <BsPencilSquare
                      onClick={() => handleEditClick(dhyaan)}
                      className="text-yellow-500 cursor-pointer text-2xl hover:text-yellow-600 transition duration-150"
                    />
                    <BsFillTrashFill
                      onClick={() => handleDeleteClick(dhyaan)}
                      className="text-red-500 cursor-pointer text-2xl hover:text-red-600 transition duration-150"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Use DeleteDhyaanModal component */}
      <DeleteDhyaan
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        dhyaan={selectedDhyaan}
      />
    </div>
  );
};

export default Dhyaan;
