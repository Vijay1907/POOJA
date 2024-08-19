import React, { useState, useRef } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { ADDDHYAAN } from '../../service';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader'; // Import your Loader component

const AddDhyaan = () => {
  const [image, setImage] = useState(null);
  const [dhyanName, setdhyanName] = useState("");
  const [dhyanDescription, setDhyaanDescription] = useState(""); // Optional
  const [editorContent, setEditorContent] = useState("");
  const [editorHeight, setEditorHeight] = useState('auto'); // To store the height of the editor
  const [loading, setLoading] = useState(false); // State to manage loading status

  const editorRef = useRef(null); // Ref for accessing the editor
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
    // Dynamically adjust the height of the editor
    if (editorRef.current) {
      const editor = editorRef.current.getEditor();
      const editorContainer = editor.root;
      setEditorHeight(editorContainer.scrollHeight);
    }
  };

  const submitData = async () => {
    setLoading(true); // Show loader when submission starts
    const formData = new FormData();
    formData.append("dhyanName", dhyanName);
    formData.append("dhyanDescription", dhyanDescription);
    formData.append("dhyanContent", editorContent);

    // Only append image if it's selected
    if (image) {
      formData.append("dhyanPoster", image);
    }

    try {
      let response = await ADDDHYAAN(formData);
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        navigate("/dhyaan");
        // Clear form fields after submission
        setdhyanName("");
        setDhyaanDescription("");
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
      setLoading(false); // Hide loader after submission
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the fields
    const updatedErrors = {
      dhyanName: !dhyanName ? "Dhyaan Name is required" : "",
      editorContent: !editorContent ? "Dhyaan Content is required" : "",
    };

    setErrors(updatedErrors);

    const hasErrors = Object.values(updatedErrors).some((error) => !!error);

    if (hasErrors) {
      return; // Prevent submission if there are errors
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

      {loading && <Loader />} {/* Show the loader when loading */}

      <div
        className="w-full max-w-4xl m-auto my-8 p-6 bg-white rounded-lg"
        style={{
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06)'
        }}
      >
        <form onSubmit={handleSubmit}>
          {/* Form Fields */}
          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-semibold mb-2">
              Dhyaan Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Dhyaan Name"
              value={dhyanName}
              onChange={(e) => setdhyanName(e.target.value)}
              disabled={loading} // Disable while loading
            />
            {errors.dhyanName && (
              <p className="text-red-500 text-sm mt-2 ml-1">{errors.dhyanName}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-semibold mb-2">
              Dhyaan Description (Optional)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Dhyaan Description"
              value={dhyanDescription}
              onChange={(e) => setDhyaanDescription(e.target.value)}
              disabled={loading} // Disable while loading
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-semibold mb-2">
              Dhyaan Content
            </label>
            <ReactQuill
              theme="snow"
              value={editorContent}
              onChange={handleEditorChange} // Use the separate function here
              ref={editorRef} // Attach the ref here
              className="bg-white"
              style={{ minHeight: editorHeight }} // Dynamically adjust the height
              readOnly={loading} // Disable editor while loading
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
              disabled={loading} // Disable while loading
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
                disabled={loading} // Disable while loading
              >
                Cancel
              </button>
              <button
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={loading} // Disable while loading
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
