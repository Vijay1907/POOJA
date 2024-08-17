import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UPDATEDHYAAN } from '../../service';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const EditDhyaan = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dhyaan = location.state?.dhyaan;

  const [formData, setFormData] = useState({
    dhyaanName: '',
    dhyaanDescription: '',
    dhyaanPoster: null,
    dhyaanContent: '', // Added dhyaanContent field
  });

  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (dhyaan) {
      setFormData({
        dhyaanName: dhyaan.dhyaanName,
        dhyaanDescription: dhyaan.dhyaanDescription,
        dhyaanPoster: null,
        dhyaanContent: dhyaan.dhyaanContent || '', // Initialize dhyaanContent from existing data
      });
      setPreviewImage(dhyaan.dhyaanPoster);
    }
  }, [dhyaan]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setFormData({ ...formData, dhyaanPoster: file });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleContentChange = (content) => {
    setFormData({ ...formData, dhyaanContent: content });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    if (formData.dhyaanName !== dhyaan.dhyaanName) formDataToSend.append('dhyaanName', formData.dhyaanName);
    if (formData.dhyaanDescription !== dhyaan.dhyaanDescription) formDataToSend.append('dhyaanDescription', formData.dhyaanDescription);
    if (formData.dhyaanPoster) formDataToSend.append('dhyaanPoster', formData.dhyaanPoster);
    if (formData.dhyaanContent !== dhyaan.dhyaanContent) formDataToSend.append('dhyaanContent', formData.dhyaanContent);

    if (formDataToSend.has('dhyaanName') || formDataToSend.has('dhyaanDescription') || formDataToSend.has('dhyaanPoster') || formDataToSend.has('dhyaanContent')) {
      try {
        await UPDATEDHYAAN(dhyaan._id, formDataToSend);
        toast.success("Dhyaan updated successfully");
        navigate('/dhyaan');
      } catch (error) {
        console.log(error);
        toast.error("Failed to update dhyaan");
      }
    } else {
      toast.info("No changes detected");
    }
  };

  if (!dhyaan) return <div>Loading...</div>;

  return (
    <div>
        <Navbar title="Edit Dhyaan" />
        <Sidebar   />
        <div className="p-6 mx-[200px]">
      {/* <h2 className="text-xl font-bold mb-4">Edit Dhyaan</h2> */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Dhyaan Name</label>
          <input
            type="text"
            name="dhyaanName"
            value={formData.dhyaanName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Description</label>
          <textarea
            name="dhyaanDescription"
            value={formData.dhyaanDescription}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Poster Image</label>
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
          <label className="block text-sm font-bold mb-2">Dhyaan Content</label>
          <ReactQuill
            value={formData.dhyaanContent}
            onChange={handleContentChange}
            className="border rounded"// Adjust to make the editor's height increase with content
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate('/dhyaan')}
            className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-purple-500 text-white py-2 px-4 rounded"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
    </div>
  
  );
};

export default EditDhyaan;
