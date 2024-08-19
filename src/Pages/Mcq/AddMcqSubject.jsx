import React, { useState, useRef } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import JoditEditor from "jodit-react";
import { ADDDHYAAN } from '../../service';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader'; // Import your Loader component

const AddDhyaan = () => {
  const [image, setImage] = useState(null);
  const [dhyanName, setDhyanName] = useState("");
  const [dhyanDescription, setDhyanDescription] = useState(""); // Optional
  const [editorContent, setEditorContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [priority, setPriority] = useState("");
  const editorRef = useRef(null);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    dhyanName: "",
    editorContent: ""
  });

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleEditorChange = (value) => {
    setEditorContent(value);
  };

  const submitData = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("dhyanName", dhyanName);
    formData.append("dhyanDescription", dhyanDescription);
    formData.append("dhyanContent", editorContent);
    if (priority) {
      formData.append("priority", priority);
    }

    if (image) {
      formData.append("dhyanPoster", image);
    }

    try {
      let response = await ADDDHYAAN(formData);
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        navigate("/dhyaan");
        setDhyanName("");
        setPriority("");
        setDhyanDescription("");
        setEditorContent("");
        setImage(null);
        setErrors({});
      } else {
        toast.error(response?.error?.data?.message);
      }
    } catch (error) {
      console.error("Error adding dhyaan:", error);
      toast.error('Error adding dhyaan.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedErrors = {
      dhyanName: !dhyanName ? "Dhyaan Name is required" : "",
      editorContent: !editorContent ? "Dhyaan Content is required" : "",
    };

    setErrors(updatedErrors);

    const hasErrors = Object.values(updatedErrors).some((error) => !!error);

    if (hasErrors) {
      return;
    }

    await submitData();
  };

  const handleCancelClick = () => {
    navigate("/dhyaan");
  };

  return (
    <div>
      <Navbar title={"Add Dhyaan"} />
      <Sidebar />

      {loading && <Loader />}

      <div
        className="w-full max-w-4xl m-auto my-8 p-6 bg-white rounded-lg"
        style={{
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06)'
        }}
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-semibold mb-2">
              Dhyaan Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Dhyaan Name"
              value={dhyanName}
              onChange={(e) => setDhyanName(e.target.value)}
              disabled={loading}
            />
            {errors.dhyanName && (
              <p className="text-red-500 text-sm mt-2 ml-1">{errors.dhyanName}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-semibold mb-2">
              Dhyaan Description
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Dhyaan Description"
              value={dhyanDescription}
              onChange={(e) => setDhyanDescription(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-semibold mb-2">
              Priority (Optional)
            </label>
            <select
              value={priority || ""}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-0"
            >
              <option className='text-gray-700 leading-tight' value="">Select Priority</option>
              {[...Array(10)].map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-semibold mb-2">
              Dhyaan Content
            </label>

            <JoditEditor
              ref={editorRef}
              value={editorContent}
              onChange={newContent => setEditorContent(newContent)}
              // onChange={handleEditorChange}
              // config={{
              //   uploader: {
              //     url: '/upload-image',
              //     insertImageAsBase64URI: false,
              //     format: 'json',
              //   },
              //   buttons: [
              //     'bold', 'italic', 'underline', 'strikethrough',
              //     'ul', 'ol', 'outdent', 'indent',
              //     'align', 'undo', 'redo', 'hr', 'link', 'image',
              //     'source'
              //   ],
              // }}
              className="bg-white"
              readOnly={loading}
            />
            {errors.editorContent && (
              <p className="text-red-500 text-sm mt-2">{errors.editorContent}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-semibold mb-2">
              Upload Dhyaan Poster
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mb-4 border border-gray-300 rounded p-2"
              disabled={loading}
            />
            {image && (
              <div className="mt-2">
                <img
                  className="max-h-40 object-contain border border-gray-300 rounded"
                  src={URL.createObjectURL(image)}
                  alt="Uploaded Preview"
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-end">
            <div>
              <button
                onClick={handleCancelClick}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-3"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={loading}
              >
                Add Dhyaan
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDhyaan;
