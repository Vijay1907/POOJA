import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Cookies from 'js-cookie';
import { privateRequest } from '../../configs/RequestMethod';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

const AddDhyaan = () => {
  const [image, setImage] = useState(null);
  const [dhyaanName, setDhyaanName] = useState("");
  const [dhyaanDescription, setDhyaanDescription] = useState(""); // Optional
  const [editorContent, setEditorContent] = useState("");

  const submitImage = async () => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "dakshin_murti");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dkhh3ayz8/auto/upload",
          {
            method: "POST",
            body: data,
          }
        );
        const result = await response.json();
        return result.secure_url;
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!dhyaanName || !editorContent) {
      toast.error('Dhyaan Name and Content are required');
      return;
    }

    const imageUrl = await submitImage();

    const payload = {
      dhyaanName: dhyaanName,
      dhyaanDescription: dhyaanDescription, // Optional
      dhyaanContent: editorContent,
      dhyaanPoster: imageUrl || "" // Optional image upload
    };

    const jwtToken = Cookies.get('jwtToken');

    try {
      const response = await privateRequest.post("/dhyaan/add", payload, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      });
      toast.success('Dhyaan added successfully!');
      setDhyaanName("");
      setDhyaanDescription("");
      setEditorContent("");
      setImage(null);
    } catch (error) {
      console.error(error);
      toast.error('Failed to add Dhyaan');
    }
  };

  return (
    <div>
      <Navbar title={"Add Dhyaan"} />
      <Sidebar />

      <div className="w-full max-w-3xl m-auto mt-8">
        <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Dhyaan Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Dhyaan Name"
              value={dhyaanName}
              onChange={(e) => setDhyaanName(e.target.value)}
            />
            {!dhyaanName && <p className="text-red-500 text-xs italic">Dhyaan name is required</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Dhyaan Description (Optional)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Dhyaan Description"
              value={dhyaanDescription}
              onChange={(e) => setDhyaanDescription(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Dhyaan Content
            </label>
            <ReactQuill
              theme="snow"
              value={editorContent}
              onChange={setEditorContent}
              className="bg-white"
            />
            {!editorContent && <p className="text-red-500 text-xs italic">Dhyaan content is required</p>}
          </div>

          <div className="mb-8">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Upload Dhyaan Poster (Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
            {image && (
              <div>
                <img
                  className="max-h-40 object-contain mt-4"
                  src={URL.createObjectURL(image)}
                  alt="Uploaded"
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
