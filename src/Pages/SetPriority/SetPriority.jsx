import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsPencilSquare, BsFillTrashFill } from "react-icons/bs";
import { AiFillEye } from "react-icons/ai";
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { toast } from 'react-toastify';
import { GETPRIORITY, SETPRIORITY, REMOVEPRIORITY } from '../../service';
import Description from '../../components/Description';
import EditBook from '../Subject/EditBook';
import DeleteBook from '../Subject/DeleteBook';
import Loader from '../Loader/Loader';
import { BACKEND_URL } from '../../configs/RequestMethod';
import Rating from '../../components/Rating';

const SetPriority = () => {
    const [subjectsList, setSubjectList] = useState([]);
    const [dhyaanList, setDhyaanList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedType, setSelectedType] = useState("Books");
    const [selectedItem, setSelectedItem] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [priorityPopupOpen, setPriorityPopupOpen] = useState(false);
    const [priorityValue, setPriorityValue] = useState("");
    const [shoudlApiHit, setShoudlApiHit] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPriorityItems();
    }, [selectedType, shoudlApiHit]);

    useEffect(() => {
        if (isEditModalOpen || isDeleteModalOpen || priorityPopupOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isEditModalOpen, isDeleteModalOpen, priorityPopupOpen]);

    const fetchPriorityItems = async () => {
        try {
            setIsLoading(true);
            const response = await GETPRIORITY(selectedType);
            const items = response?.data?.data || [];
            if (selectedType === "Books") {
                setSubjectList(items);
            } else {
                setDhyaanList(items);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch items");
        } finally {
            setIsLoading(false);
        }
    };

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
    };

    const handlePriorityChange = (e) => {
        setPriorityValue(e.target.value);
    };

    const openPriorityPopup = (item) => {
        setSelectedItem(item);
        setPriorityPopupOpen(true);
        setPriorityValue(item.priority || "");
    };

    const handlePrioritySubmit = async () => {
        try {
            setIsLoading(true);
            const formData = { priority: priorityValue };
            await SETPRIORITY(formData);
            setPriorityPopupOpen(false);
            setShoudlApiHit(!shoudlApiHit);
            toast.success("Priority updated successfully");
        } catch (error) {
            console.log(error);
            toast.error("Failed to update priority");
        } finally {
            setIsLoading(false);
        }
    };

    const handleRemovePriority = async () => {
        try {
            setIsLoading(true);
            await REMOVEPRIORITY(selectedItem._id);
            setPriorityPopupOpen(false);
            setShoudlApiHit(!shoudlApiHit);
            toast.success("Priority removed successfully");
        } catch (error) {
            console.log(error);
            toast.error("Failed to remove priority");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Navbar title="Set Priority" />
            <Sidebar />
            <div className="p-6 ml-10">
                <div className="flex justify-between mb-4">
                    <select
                        value={selectedType}
                        onChange={handleTypeChange}
                        className="w-1/3 px-4 py-2 border-2 rounded-lg ml-8 focus:outline-none focus:ring-2 focus:border-transparent transition duration-200"
                    >
                        <option value="Books">Books</option>
                        <option value="Dhyaan">Dhyaan</option>
                    </select>
                </div>
                {isLoading ? (
                    <Loader />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-9 ml-5">
                        {selectedType === "Books" ? (
                            subjectsList.length === 0 ? (
                                <div className="text-center text-gray-600 mt-10">No books available</div>
                            ) : (
                                subjectsList.map((book, index) => (
                                    <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                                        <div className='flex items-center justify-center mx-2 px-3'>
                                            <img src={`${BACKEND_URL}/${book.coverImage}`} alt={book.bookName} className="h-[180px] object-contain mt-3" />
                                        </div>
                                        <div className="p-4 pb-2">
                                            <h3 className="text-lg font-semibold mb-2">{book.bookName}</h3>
                                            <Description description={book.bookDescription} />
                                            <Rating rating={book.rating} />
                                            <div className="flex gap-x-12 items-center mt-4">
                                                <BsPencilSquare
                                                    onClick={() => openPriorityPopup(book)}
                                                    className="text-yellow-500 cursor-pointer text-2xl hover:text-yellow-600 transition duration-150"
                                                />
                                                <AiFillEye
                                                    onClick={() => navigate('/view-pdf', { state: { pdfUrl: book.pdfUrl } })}
                                                    className="text-blue-500 cursor-pointer text-2xl hover:text-blue-600 transition duration-150"
                                                />
                                                <BsFillTrashFill
                                                    onClick={() => setIsDeleteModalOpen(true)}
                                                    className="text-red-500 cursor-pointer text-2xl hover:text-red-600 transition duration-150"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )
                        ) : (
                            dhyaanList.length === 0 ? (
                                <div className="text-center text-gray-600 mt-10">No Dhyaan available</div>
                            ) : (
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
                                                {dhyaan.priority && (
                                                    <div className="w-8 h-8 bg-green-500 text-white flex items-center justify-center rounded-full text-sm font-bold">
                                                        {dhyaan.priority}
                                                    </div>
                                                )}
                                                <BsPencilSquare
                                                    onClick={() => openPriorityPopup(dhyaan)}
                                                    className="text-yellow-500 cursor-pointer text-2xl hover:text-yellow-600 transition duration-150"
                                                />
                                                <BsFillTrashFill
                                                    onClick={() => setIsDeleteModalOpen(true)}
                                                    className="text-red-500 cursor-pointer text-2xl hover:text-red-600 transition duration-150"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )
                        )}
                    </div>
                )}
            </div>

            {/* Priority Popup */}
            {priorityPopupOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                        <h2 className="text-lg font-bold mb-4">Change Priority</h2>
                        <select
                            value={priorityValue}
                            onChange={handlePriorityChange}
                            className="w-full mb-4 px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition duration-200"
                        >
                            {[...Array(10).keys()].map((num) => (
                                <option key={num + 1} value={num + 1}>
                                    {num + 1}
                                </option>
                            ))}
                        </select>
                        <div className="flex justify-between">
                            <button
                                onClick={handlePrioritySubmit}
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Change Priority
                            </button>
                            <button
                                onClick={handleRemovePriority}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Remove Priority
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isEditModalOpen && <EditBook onClose={() => setIsEditModalOpen(false)} />}
            {isDeleteModalOpen && <DeleteBook onClose={() => setIsDeleteModalOpen(false)} />}
        </div>
    );
};

export default SetPriority;
