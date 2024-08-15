import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsPencilSquare, BsFillTrashFill } from "react-icons/bs";
import { AiFillEye } from "react-icons/ai";
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { toast } from 'react-toastify';
import { DELETEBOOK, GETBOOKS, UPDATEBOOK } from '../../service';
import { FaFilePdf } from 'react-icons/fa';

const Books = () => {
  const [subjectsList, setSubjectList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [originalBook, setOriginalBook] = useState(null); // Track original book data
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewPdf, setPreviewPdf] = useState(null);
  const [formData, setFormData] = useState({
    bookName: "",
    bookDescription: "",
    coverImage: null,
    bookPdf: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    getAllSubjects();
  }, []);

  useEffect(() => {
    if (isEditModalOpen || isDeleteModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isEditModalOpen, isDeleteModalOpen]);

  const getAllSubjects = async () => {
    try {
      setIsLoading(true);
      const response = await GETBOOKS();
      setSubjectList(response?.data?.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch books");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSubject = async (id) => {
    try {
      await DELETEBOOK(id);
      getAllSubjects();
      setIsDeleteModalOpen(false);
      toast.success("Book deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete book");
    }
  };

  const handleViewClick = (book) => {
    navigate('/view-pdf', { state: { pdfUrl: book.bookPdf } });
  };

  const handleEditClick = (book) => {
    setSelectedBook(book);
    setOriginalBook({ ...book });
    setPreviewImage(book.coverImage);
    setPreviewPdf("");
    setFormData({
      bookName: book.bookName,
      bookDescription: book.bookDescription,
      coverImage: null,
      bookPdf: null,
    });
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (book) => {
    setSelectedBook(book);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    deleteSubject(selectedBook._id);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setFormData({ ...formData, coverImage: file });
    }
  };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewPdf(URL.createObjectURL(file));
      setFormData({ ...formData, bookPdf: file });
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to send
    const formDataToSend = new FormData();

    // Add only the changed fields
    if (formData.bookName !== originalBook.bookName) formDataToSend.append('bookName', formData.bookName);
    if (formData.bookDescription !== originalBook.bookDescription) formDataToSend.append('bookDescription', formData.bookDescription);
    if (formData.coverImage) formDataToSend.append('coverImage', formData.coverImage);
    if (formData.bookPdf) formDataToSend.append('bookPdf', formData.bookPdf);

    if (formDataToSend.has('bookName') || formDataToSend.has('bookDescription') || formDataToSend.has('coverImage') || formDataToSend.has('bookPdf')) {
      try {
        let response = await UPDATEBOOK(selectedBook._id, formDataToSend);
        setIsEditModalOpen(false);
        toast.success(response?.data?.message || "Book updated successfully");
        getAllSubjects();
      } catch (error) {
        console.log(error);
        toast.error("Failed to update book");
      }
    } else {
      toast.info("No changes detected");
    }
  };

  return (
    <div>
      <Navbar title="Books" />
      <Sidebar />
      <div className="p-6 ml-10">
        <div className="flex justify-end mb-4">
          <Link to='/add-books'>
            <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
              Add Book
            </button>
          </Link>
        </div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ml-5">
            {subjectsList?.map((book, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                <img src={book.coverImage} alt={book.bookName} className="w-full h-60 object-contain" />
                <div className="p-4">
                  <hr className="border-gray-300 mb-3" />
                  <h3 className="text-lg font-semibold mb-2">{book.bookName}</h3>
                  <p className="text-gray-600 text-sm mb-4">{book.bookDescription}</p>
                  <div className="flex justify-around items-center">
                    <BsPencilSquare
                      onClick={() => handleEditClick(book)}
                      className="text-yellow-500 cursor-pointer text-2xl hover:text-yellow-600 transition duration-150"
                    />
                    <AiFillEye
                      onClick={() => handleViewClick(book)}
                      className="text-blue-500 cursor-pointer text-2xl hover:text-blue-600 transition duration-150"
                    />
                    <BsFillTrashFill
                      onClick={() => handleDeleteClick(book)}
                      className="text-red-500 cursor-pointer text-2xl hover:text-red-600 transition duration-150"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-lg w-full h-4/5 overflow-y-auto">
            <div className="p-4">
              <h2 className="text-xl font-bold mb-4">Edit Book</h2>
              <form onSubmit={handleEditSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2">Book Name</label>
                  <input
                    type="text"
                    value={formData.bookName}
                    onChange={(e) => setFormData({ ...formData, bookName: e.target.value })}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2">Description</label>
                  <textarea
                    value={formData.bookDescription}
                    onChange={(e) => setFormData({ ...formData, bookDescription: e.target.value })}
                    className="w-full px-3 py-2 border rounded"
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2">Cover Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                  {previewImage && (
                    <img src={previewImage} alt="Preview" className="mt-2 max-w-60 h-32 object-cover rounded" />
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2">Book PDF</label>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handlePdfChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                  {previewPdf && (
                    <a href={previewPdf} target="_blank" rel="noopener noreferrer" className="mt-2 text-blue-500">
                      <FaFilePdf className="inline mr-1" /> View PDF
                    </a>
                  )}
                </div>
                <div className="flex justify-end">
                  <button type="button" onClick={() => setIsEditModalOpen(false)} className="bg-gray-500 text-white py-2 px-4 rounded mr-2">
                    Cancel
                  </button>
                  <button type="submit" className="bg-purple-500 text-white py-2 px-4 rounded">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-sm w-full">
            <div className="p-4">
              <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
              <p>Are you sure you want to delete this book?</p>
              <div className="flex justify-end mt-4">
                <button type="button" onClick={() => setIsDeleteModalOpen(false)} className="bg-gray-500 text-white py-2 px-4 rounded mr-2">
                  Cancel
                </button>
                <button type="button" onClick={handleDeleteConfirm} className="bg-red-500 text-white py-2 px-4 rounded">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Books;
