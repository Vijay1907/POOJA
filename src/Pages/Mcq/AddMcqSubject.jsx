import  { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Cookies from 'js-cookie';
import { privateRequest } from '../../configs/RequestMethod';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddMcqSubject = () => {
  const [image, setImage] = useState(null);
  const [subjectName, setSubjectName] = useState("");


  const submitImage = async () => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "dakshin_murti"); // Replace with your actual upload preset name

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dkhh3ayz8/auto/upload",
          {
            method: "POST",
            body: data,
          }
        );
        const result = await response.json();
        console.log(result);

        // Here you can use result.url or result.secure_url to store the uploaded image URL
        // in your state or send it to your backend.

        // Now, create the payload object with subject data
        const payload = {
          subjectName: subjectName,
          subjectPoster: result.secure_url // Use the uploaded image URL from Cloudinary response
        };

         // Retrieve the JWT token from cookies
    const jwtToken = Cookies.get('jwtToken');

        // Send the payload to your backend API using Axios
        try {
          const response = await privateRequest.post("/study/mcqSubject", payload , {
            headers: {
              Authorization: `Bearer ${jwtToken}` // Include the JWT token in the Authorization header
            }
          });
          console.log(response.data);
          toast.success('Subject added successfully!');
        } catch (error) {
          console.error(error);
        }

      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subjectName || !image) {
      toast.error('All fields are required');
      return;
    }

    // Call the function to upload image to Cloudinary
    await submitImage();

    // Clear form fields after submission
    setSubjectName("");
    setImage(null);
  };



  return (
    <div>
      <Navbar title={"Add MCQ Subject"} />
      <Sidebar />

      <div className="w-full max-w-xl m-auto mt-8 ">
        <form
          className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-8">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Subject Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Subject Name"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
            />
            {!subjectName && (
  <p className="text-red-500 text-xs italic">Subject name is required</p>
)}
          </div>

          <div className="flex items-center mb-8 justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            {/* <div className="bg-white rounded p-3 opacity-90 flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                aria-hidden="true"
                className="w-10 h-10 mb-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div> */}
            {image && (
              <div>
                <img
                  className="max-h-[9rem] object-contain"
                  src={URL.createObjectURL(image)} // Display the selected image
                  alt="Uploaded"
                />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              className=""
              onChange={(e) => setImage(e.target.files[0])}
            />
            {!image && (
  <p className="text-red-500 text-xs italic">Image is required</p>
)}
          </div>
          <div className="flex items-center justify-end">
            <button
              className="bg-purple-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Mcq Subject
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMcqSubject;
