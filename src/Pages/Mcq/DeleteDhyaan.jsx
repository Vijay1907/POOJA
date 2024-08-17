import React from 'react';
import { BsFillTrashFill } from "react-icons/bs";

const DeleteDhyaanModal = ({ isOpen, onClose, onConfirm, dhyaan }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-sm w-full">
        <div className="p-4">
          <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
          <p>Are you sure you want to delete <strong>{dhyaan?.dhyaanName}</strong>?</p>
          <div className="flex justify-end mt-4">
            <button type="button" onClick={onClose} className="bg-gray-500 text-white py-2 px-4 rounded mr-2">
              Cancel
            </button>
            <button type="button" onClick={() => onConfirm(dhyaan._id)} className="bg-red-500 text-white py-2 px-4 rounded">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteDhyaanModal;
