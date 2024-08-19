import React from 'react'
import { FaFilePdf } from 'react-icons/fa'

const EditBook = ({ handleEditSubmit, formData, setFormData, handleImageChange, previewImage, previewPdf, setIsEditModalOpen, handlePdfChange }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-2xl w-[70vw] h-[90vh] overflow-y-auto">
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
              <label className="block text-sm font-bold mb-2">Priority</label>
              <select
                value={formData.priority || ""}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-0"
              >
                <option value="">Select Priority</option>
                {[...Array(10)].map((_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>

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
  )
}

export default EditBook