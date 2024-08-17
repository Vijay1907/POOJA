import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { privateRequest } from '../../configs/RequestMethod';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaFilePdf } from 'react-icons/fa';
import { ADDBOOK } from '../../service';

const AddBooks = () => {
  const [image, setImage] = useState(null);
  const [bookName, setBookName] = useState("");
  const [bookDescription, setBookDescription] = useState("");
  const [bookPdf, setBookPdf] = useState(null);
  const [errors, setErrors] = useState({
    bookName: "",
    bookPdf: null
  });
  const navigate = useNavigate();

  const submitData = async () => {
    if (image && bookPdf) {
      const formData = new FormData();
      formData.append("bookName", bookName);
      formData.append("bookDescription", bookDescription);
      formData.append("coverImage", image);  // Binary file
      formData.append("bookPdf", bookPdf);  // Binary file
      try {
        let response = await ADDBOOK(formData)
        if (response?.data?.success) {
          toast.success(response?.data?.message);
          navigate("/books")
          // Clear form fields after submission
          setBookName("");
          setBookDescription("");
          setImage(null);
          setBookPdf(null);
          setErrors({})
        } else {
          toast.error(response?.error?.data?.message);
        }
      } catch (error) {
        console.error("Error adding book:", error);
        toast.error('Error adding book.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedErrors = {
      bookName: !bookName && "Book Name is required",
      bookPdf: !bookPdf && "Book PDF is required",
    };

    const hasErrors = Object.values(updatedErrors).some((error) => !!error);

    if (hasErrors) {
      setErrors(updatedErrors);
      return;
    }

    await submitData();
  };
  const handleCancelClick = () => {
    navigate("/books")
  }

  return (
    <div>
      <Navbar title={"Add Book"} />
      <Sidebar />

      <div className="w-full max-w-xl m-auto mt-8 ">
        <form
          className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-8">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Book Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Book Name"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
            />
            {errors.bookName && (
              <p className="text-red-500 text-sm">{errors.bookName}</p>
            )}
          </div>
          <div className="mb-8">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Book Description
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Book Description"
              value={bookDescription}
              onChange={(e) => setBookDescription(e.target.value)}
            />
          </div>

          <div className="mb-8">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Cover Image
            </label>
            <div className="flex flex-col  w-full border-2 p-1 gap-1 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <input
                type="file"
                accept="image/*"
                className=""
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            {image && (
              <div className='mt-1'>
                <img
                  className="max-h-[150px] object-contain"
                  src={URL.createObjectURL(image)}
                  alt="Uploaded"
                />
              </div>
            )}
          </div>

          <div className="mb-8">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Book PDF
            </label>
            <div className="flex flex-col w-full h-full p-1 gap-1 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">



              <input
                type="file"
                accept="application/pdf"
                className=""
                onChange={(e) => setBookPdf(e.target.files[0])}
              />


            </div>
            {bookPdf && (
              <div className="flex items-center gap-2 mt-1">
                <FaFilePdf className="text-red-500" size={20} />
                <p className="text-sm font-semibold text-center text-gray-600">
                  PDF uploaded
                </p>
              </div>
            )}
            {errors.bookPdf && (
              <p className="text-red-500 text-sm">{errors.bookPdf}</p>
            )}
          </div>

          <div className="flex items-center justify-end">
            <div>
              <button
                onClick={handleCancelClick}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-3"
              >
                Cancel
              </button>
              <button
                className="bg-purple-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Add Book
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBooks;
