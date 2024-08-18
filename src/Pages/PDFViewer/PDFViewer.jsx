import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { BACKEND_URL } from '../../configs/RequestMethod';

const PdfViewer = () => {
    const location = useLocation();
    const { pdfUrl } = location.state || {}; // Get the PDF URL passed in the route state

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="flex justify-end items-center mb-4">
                {/* <h1 className="text-2xl font-semibold">PDF Viewer</h1> */}
                <Link to="/books">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded">
                        Back to Books
                    </button>
                </Link>
            </div>
            <div className="pdf-viewer-container">
                {pdfUrl ? (
                    <embed
                        src={BACKEND_URL+"/"+ pdfUrl}
                        type="application/pdf"
                        width="100%"
                        height="600px"
                        className="border rounded shadow"
                    />
                ) : (
                    <p className="text-red-500">No PDF to display</p>
                )}
            </div>
        </div>
    );
};

export default PdfViewer;
