import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';

// Set the worker source for pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PdfViewer = () => {
    const location = useLocation();
    const { pdfUrl } = location.state || {}; // Get the PDF URL passed in the route state

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">PDF Viewer</h1>
                <Link to="/books">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded">
                        Back to Books
                    </button>
                </Link>
            </div>
            {pdfUrl ? (
                <div className="pdf-viewer-container">
                    <Document
                        file={pdfUrl}
                        onLoadSuccess={({ numPages }) => console.log(`Loaded ${numPages} pages`)}
                        className="pdf-document"
                    >
                        {/* Render all pages */}
                        {Array.from(new Array(2), (el, index) => (
                            <Page key={index} pageNumber={index + 1} />
                        ))}
                    </Document>
                </div>
            ) : (
                <p className="text-red-500">No PDF to display</p>
            )}
        </div>
    );
};

export default PdfViewer;
