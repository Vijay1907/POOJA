import React from 'react'
import { FaFilePdf } from 'react-icons/fa';

import { UPDATEBOOK } from '../../service';

const EditBook = ({ setIsEditModalOpen }) => {
    const [previewImage, setPreviewImage] = useState(null);
    const [previewPdf, setPreviewPdf] = useState(null);
    const [originalBook, setOriginalBook] = useState(null); // Track original book data
    const [formData, setFormData] = useState({
        bookName: "",
        bookDescription: "",
        coverImage: null,
        bookPdf: null,
    });

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
            setFormData({ ...formData, bookPdf: file });
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        // Prepare the data to send
        const formDataToSend = new FormData();

        // Add only the changed fields
        if (formData.bookName !== originalBook.bookName) formDataToSend.append('bookName', formData.bookName);
        if (formData.bookDescription !== originalBook.bookDescription) formDataToSend.append('bookDescription', formData.bookDescription);
        if (formData.coverImage) formDataToSend.append('coverImage', formData.coverImage);
        if (formData.bookPdf) formDataToSend.append('bookPdf', formData.bookPdf);

        if (formDataToSend.has('bookName') || formDataToSend.has('bookDescription') || formDataToSend.has('coverImage') || formDataToSend.has('bookPdf')) {
            try {
                let response = await UPDATEBOOK(selectedBook._id, formDataToSend);
                setIsEditModalOpen(false);
                toast.success(response?.data?.message || "Book updated successfully");
                getAllSubjects();
            } catch (error) {
                console.log(error);
                toast.error("Failed to update book");
            }
        } else {
            toast.info("No changes detected");
        }
    };


    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-lg w-full h-4/5 overflow-y-auto">
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