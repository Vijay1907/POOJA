import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsPencilSquare, BsFillTrashFill } from "react-icons/bs";
import { AiFillEye } from "react-icons/ai";
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { toast } from 'react-toastify';
import { DELETEBOOK, GETBOOKS, UPDATEBOOK } from '../../service';
import Description from '../../components/Description';
import EditBook from './EditBook';
import DeleteBook from './DeleteBook';
import Loader from '../Loader/Loader';
import debounce from 'lodash/debounce';
import { BACKEND_URL } from '../../configs/RequestMethod';

const Books = () => {
  const [subjectsList, setSubjectList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [originalBook, setOriginalBook] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewPdf, setPreviewPdf] = useState(null);
  const [shoudlApiHit, setShoudlApiHit] = useState(false);
  const [formData, setFormData] = useState({
    bookName: "",
    bookDescription: "",
    coverImage: null,
    pdfUrl: null,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [noDataFound, setNoDataFound] = useState(false); // State for empty results
  const navigate = useNavigate();

  useEffect(() => {
    getAllSubjects(1);
  }, [shoudlApiHit]);

  useEffect(() => {
    if (isEditModalOpen || isDeleteModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isEditModalOpen, isDeleteModalOpen]);

  const getAllSubjects = async (page = 1, search = "") => {
    try {
      setIsLoading(true);
      const response = await GETBOOKS(search, page, 10);
      const books = response?.data?.books || [];
      setSubjectList((prevBooks) => (page === 1 ? books : [...prevBooks, ...books]));
      setTotalPages(response?.data?.pagination?.total_pages || 1);
      setPage(response?.data?.pagination?.current_page || 1);
      setNoDataFound(books.length === 0 && page === 1); // Check for no data in the first page
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to fetch books");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSubject = async (id) => {
    try {
      setIsLoading(true);
      await DELETEBOOK(id);
      getAllSubjects(page, searchTerm);
      setIsDeleteModalOpen(false);
      setShoudlApiHit(!shoudlApiHit)
      toast.success("Book deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete book");
    }finally {
      setIsLoading(false);
    }
  };

  const handleViewClick = (book) => {
    navigate('/view-pdf', { state: { pdfUrl: book.pdfUrl } });
  };

  const handleEditClick = (book) => {
    setSelectedBook(book);
    setOriginalBook({ ...book });
    setPreviewImage(`${BACKEND_URL}/${book.coverImage}`);
    setPreviewPdf("");
    setFormData({
      bookName: book.bookName,
      bookDescription: book.bookDescription,
      coverImage: null,
      pdfUrl: null,
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
      setFormData({ ...formData, pdfUrl: file });
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    if (formData.bookName !== originalBook.bookName) formDataToSend.append('bookName', formData.bookName);
    if (formData.bookDescription !== originalBook.bookDescription) formDataToSend.append('bookDescription', formData.bookDescription);
    if (formData.coverImage) formDataToSend.append('coverImage', formData.coverImage);
    if (formData.pdfUrl) formDataToSend.append('pdfUrl', formData.pdfUrl);

    if (formDataToSend.has('bookName') || formDataToSend.has('bookDescription') || formDataToSend.has('coverImage') || formDataToSend.has('pdfUrl')) {
      try {
    setIsLoading(true)
        console.log("selec",selectedBook)
        let response = await UPDATEBOOK(selectedBook._id, formDataToSend);
        setIsEditModalOpen(false);
        toast.success(response?.data?.message || "Book updated successfully");
        getAllSubjects(page, searchTerm);
        setShoudlApiHit(!shoudlApiHit)
      } catch (error) {
        console.log(error);
        toast.error("Failed to update book");
      }
      finally {
        setIsLoading(false);
      }
    } else {
      toast.info("No changes detected");
    }
  };

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight - 10) {
      if (page < totalPages) {
        getAllSubjects(page + 1, searchTerm);
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const debouncedSearch = useCallback(
    debounce((nextValue) => {
      if (nextValue.length >= 3) {
        getAllSubjects(1, nextValue);
      }else if(!nextValue){
        getAllSubjects(1, nextValue);
      }
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, totalPages]);

  return (
    <div>
      <Navbar title="Books" />
      <Sidebar />
      <div className="p-6 ml-10">
        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-1/3 px-4 py-2 border-2 rounded-lg ml-[100px] focus:outline-none focus:ring-2 focus:border-transparent transition duration-200"
          />
          <Link to='/add-books'>
            <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
              Add Book
            </button>
          </Link>
        </div>
        {isLoading && page === 1 ? (
          <Loader />
        ) : noDataFound ? (
          <div className="text-center text-gray-600 mt-10">No data found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-9 ml-5">
            {subjectsList.length === 0 ? (
              <div className="text-center text-gray-600 mt-10">No books available</div>
            ) : (
              subjectsList.map((book, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                  <div className='flex items-center justify-center mx-2 px-3'>
                    <img src={`${BACKEND_URL}/${book.coverImage}`} alt={book.bookName} className="h-[180px] object-contain mt-3" />
                  </div>
                  <div className="p-4 pb-2">
                    {/* <hr className="border-gray-300 mb-3" /> */}
                    <h3 className="text-lg font-semibold mb-2">{book.bookName}</h3>
                    <Description description={book.bookDescription} />
                    <div className="flex gap-x-12 items-center">
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
              ))
            )}
          </div>
        )}
        {isLoading && page > 1 && (
          <div className="flex justify-center">
            <Loader />
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && <EditBook handleEditSubmit={handleEditSubmit} formData={formData} setFormData={setFormData} handleImageChange={handleImageChange} previewImage={previewImage} previewPdf={previewPdf} setIsEditModalOpen={setIsEditModalOpen} handlePdfChange={handlePdfChange} />}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && <DeleteBook setIsDeleteModalOpen={setIsDeleteModalOpen} handleDeleteConfirm={handleDeleteConfirm} />}
    </div>
  );
};

export default Books;
