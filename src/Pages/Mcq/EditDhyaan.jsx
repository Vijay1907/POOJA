import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UPDATEDHYAAN } from '../../service';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { BACKEND_URL } from '../../configs/RequestMethod';

const EditDhyaan = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dhyaan = location.state?.dhyaan;

  const [formData, setFormData] = useState({
    dhyanName: '',
    dhyanDescription: '',
    dhyanPoster: null,
    dhyanContent: '',
  });

  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (dhyaan) {
      setFormData({
        dhyanName: dhyaan.dhyanName || '',
        dhyanDescription: dhyaan.dhyanDescription || '',
        dhyanPoster: null,  // Don't pre-set the poster image here, handle it separately
        dhyanContent: dhyaan.dhyanContent || '',
      });
      setPreviewImage(dhyaan.dhyanPoster ? `${BACKEND_URL}/${dhyaan.dhyanPoster}` : null);
    }
  }, [dhyaan]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setFormData(prevFormData => ({ ...prevFormData, dhyanPoster: file }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const handleContentChange = (content) => {
    setFormData(prevFormData => ({ ...prevFormData, dhyanContent: content }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    if (formData.dhyanName !== dhyaan.dhyanName) formDataToSend.append('dhyanName', formData.dhyanName);
    if (formData.dhyanDescription !== dhyaan.dhyanDescription) formDataToSend.append('dhyanDescription', formData.dhyanDescription);
    if (formData.dhyanPoster) formDataToSend.append('dhyanPoster', formData.dhyanPoster);
    if (formData.dhyanContent !== dhyaan.dhyanContent) formDataToSend.append('dhyanContent', formData.dhyanContent);

    if (formDataToSend.has('dhyanName') || formDataToSend.has('dhyanDescription') || formDataToSend.has('dhyanPoster') || formDataToSend.has('dhyanContent')) {
      try {
        let response = await UPDATEDHYAAN(dhyaan._id, formDataToSend);
        toast.success("Dhyaan updated successfully");
        navigate('/dhyaan');
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Failed to update Dhyaan");
      }
    } else {
      toast.info("No changes detected");
    }
  };

  if (!dhyaan) return <div>Loading...</div>;

  return (
    <div>
      <Navbar title="Edit Dhyaan" />
      <Sidebar />
      <div className="p-6 mx-[200px]">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Dhyaan Name</label>
            <input
              type="text"
              name="dhyanName"
              value={formData.dhyanName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Description</label>
            <textarea
              name="dhyanDescription"
              value={formData.dhyanDescription}
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
              value={formData.dhyanContent}
              onChange={handleContentChange}
              className="border rounded" // Adjust to make the editor's height increase with content
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
