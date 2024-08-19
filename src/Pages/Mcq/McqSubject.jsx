import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsPencilSquare, BsFillTrashFill } from "react-icons/bs";
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { toast } from 'react-toastify';
import { DELETEDHYAAN, GETDHYAAN } from '../../service';
import DeleteDhyaan from './DeleteDhyaan';
import Description from '../../components/Description';
import { BACKEND_URL } from '../../configs/RequestMethod';
import debounce from 'lodash/debounce';
import Loader from '../Loader/Loader'
import Rating from '../../components/Rating';

const Dhyaan = () => {
  const [dhyaanList, setDhyaanList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDhyaan, setSelectedDhyaan] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const [shoudlApiHit, setShoudlApiHit] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    getAllDhyaan('', 1);
  }, [shoudlApiHit]);

  useEffect(() => {
    if (isDeleteModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isDeleteModalOpen]);

  const getAllDhyaan = async (search = "", page = 1) => {
    try {
      setIsLoading(true);
      const response = await GETDHYAAN(search, page, 10);
      setDhyaanList((prevDhyaan) => (page === 1 ? response?.data?.dhyaans : [...prevDhyaan, ...response?.data?.dhyaans]));
      setTotalPages(response?.data?.pagination?.total_pages || 1);
      setPage(response?.data?.pagination?.current_page || 1);
    } catch (error) {
      console.log(error);
      toast.error(response?.error?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteDhyaan = async (id) => {
    try {
      setIsLoading(true);
      let response = await DELETEDHYAAN(id);
      getAllDhyaan(searchTerm, page);
      setIsDeleteModalOpen(false);
      setShoudlApiHit(!shoudlApiHit)
      toast.success(response?.data?.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to delete dhyaan");
    } finally {
      setIsLoading(false);
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


  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight - 10) {
      if (page < totalPages) {
        getAllDhyaan(searchTerm, page + 1,);
      }
    }
  };

  const handleSearchChange = (e) => {
    console.log("each tem handle chagne", e.target.value)
    setSearchTerm(e.target.value);
  };


  const debouncedSearch = useCallback(
    debounce((nextValue) => {
      console.log("check next value", nextValue)
      if (nextValue.length >= 3) {
        getAllDhyaan(nextValue, 1);
      } else if (!nextValue) {
        getAllDhyaan(nextValue, 1);
      }
    }, 300),
    []
  );

  useEffect(() => {
    console.log("devounce")
    debouncedSearch(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, totalPages]);

  return (
    <div>
      <Navbar title="Dhyaan" />
      <Sidebar />
      <div className="p-6 ml-10">
        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search dhyaans..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-1/3 px-4 py-2 border-2 rounded-lg ml-8 focus:outline-none focus:ring-2 focus:border-transparent transition duration-200"
          />
          <Link to='/add-dhyaan'>
            <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
              Add Dhyaan
            </button>
          </Link>
        </div>
        {isLoading && page === 1 ? (
          <Loader /> // Display loader when fetching data
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ml-5">
            {dhyaanList?.length ? (
              dhyaanList.map((dhyaan, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                  <div className='flex items-center justify-center mx-2 px-3'>
                    <img src={`${BACKEND_URL}/${dhyaan.dhyanPoster}`} alt={dhyaan.dhyanName} className="h-[180px] object-contain mt-3" />
                  </div>
                  <div className="p-4 pb-2">
                    <h3 className="text-lg font-semibold mb-2">{dhyaan.dhyanName}</h3>
                    <Description description={dhyaan.dhyanDescription} />
                    <Rating rating={dhyaan.rating} />
                    <div className="flex gap-x-12 items-center mt-4">
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
              ))
            ) : (
              <div className="text-center text-gray-600">No dhyaans found</div>
            )}
          </div>
        )}
        {isLoading && page > 1 && (
          <div className="flex justify-center mt-4">
            <Loader /> {/* Display loader while fetching more data */}
          </div>
        )}
      </div>

      {/* Use DeleteDhyaanModal component */}
      <DeleteDhyaan
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => handleDeleteConfirm(selectedDhyaan?._id)}
        dhyaan={selectedDhyaan}
      />
    </div>
  );
};

export default Dhyaan;
