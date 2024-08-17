import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Cookies from 'js-cookie';
import { privateRequest } from '../../configs/RequestMethod';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { ADDDHYAAN } from '../../service';

const AddDhyaan = () => {
  const [image, setImage] = useState(null);
  const [dhyaanName, setDhyaanName] = useState("");
  const [dhyaanDescription, setDhyaanDescription] = useState(""); // Optional
  const [editorContent, setEditorContent] = useState("");
  const [editorHeight, setEditorHeight] = useState('auto'); // To store the height of the editor

  const editorRef = useRef(null); // Ref for accessing the editor

  const [errors, setErrors] = useState({
    dhyaanName: "",
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
    const formData = new FormData();
    formData.append("dhyaanName", dhyaanName);
    formData.append("dhyaanDescription", dhyaanDescription);
    formData.append("dhyaanContent", editorContent);
    
    // Only append image if it's selected
    if (image) {
      formData.append("dhyaanPoster", image);
    }

    try {
      let response = await ADDDHYAAN(formData);
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        // Clear form fields after submission
        setDhyaanName("");
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
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the fields
    const updatedErrors = {
      dhyaanName: !dhyaanName ? "Dhyaan Name is required" : "",
      editorContent: !editorContent ? "Dhyaan Content is required" : "",
    };

    setErrors(updatedErrors);

    const hasErrors = Object.values(updatedErrors).some((error) => !!error);

    if (hasErrors) {
      return; // Prevent submission if there are errors
    }

    await submitData();
  };

  return (
    <div>
      <Navbar title={"Add Dhyaan"} />
      <Sidebar />

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
              value={dhyaanName}
              onChange={(e) => setDhyaanName(e.target.value)}
            />
            {errors.dhyaanName && (
              <p className="text-red-500 text-sm mt-2 ml-1">{errors.dhyaanName}</p>
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
              value={dhyaanDescription}
              onChange={(e) => setDhyaanDescription(e.target.value)}
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
            />
            {image && (
              <div className="mt-2 flex justify-center">
                <p className="text-gray-700 text-sm mb-2">Image Preview:</p>
                <img
                  className="max-h-60 object-contain border border-gray-300 rounded"
                  src={URL.createObjectURL(image)}
                  alt="Uploaded Preview"
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-end">
            <button
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Dhyaan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDhyaan;
