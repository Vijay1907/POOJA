import React from 'react'

const DeleteBook = ({setIsDeleteModalOpen,handleDeleteConfirm}) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-sm w-full">
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
        <p>Are you sure you want to delete this book?</p>
        <div className="flex justify-end mt-4">
          <button type="button" onClick={() => setIsDeleteModalOpen(false)} className="bg-gray-500 text-white py-2 px-4 rounded mr-2">
            Cancel
          </button>
          <button type="button" onClick={handleDeleteConfirm} className="bg-red-500 text-white py-2 px-4 rounded">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default DeleteBook