import { useState, useEffect } from 'react';
import { privateRequest } from '../../configs/RequestMethod';
import { toast } from 'react-toastify';

const UpdateReference = ({isOpen, onClose, refId,referenceData,userId,setIsUpdate }) => {
    const [name, setName] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [status, setStatus] = useState('');
    const [remarks, setRemarks] = useState("");

  
    const handleUpdate = async () => {
      try {

        const payload = {
          userId
        };

        if (name) {
          payload.name = name;
        }
  
        if (mobileNo) {
          payload.mobileNo = mobileNo;
        }
  
        if (status) {
          payload.status = status;
        }
  
        if (remarks) {
          payload.remarks = remarks;
        }
  
        console.log("pay------",payload)
        const updateResponse = await privateRequest.put(`/users/ref/${refId}`, payload);
  
        if (updateResponse.data.status === 'success') {
          setIsUpdate((prev)=> !prev)
          toast.success('Reference updated successfully!');
          onClose();
        } else {
          toast.error('Failed to update reference.');
        }
      } catch (error) {
        toast.error(error.response.data.message)
        console.log(error);
      }
    };

    useEffect(() => {
      if (isOpen) {
        // Prevent scrolling on the body when the modal is open
        document.body.style.overflow = 'hidden';
      } else {
        // Re-enable scrolling on the body when the modal is closed
        document.body.style.overflow = 'auto';
      }
  
      return () => {
        // Re-enable scrolling on unmount
        document.body.style.overflow = 'auto';
      };
    }, [isOpen]);

    if (!isOpen) {
        return null;
      }

  return (
    

    <div style={modalStyle}>
    <div style={modalContentStyle}>
      
      <div className="w-full max-w-xl m-auto mt-8">
      <span style={closeIconStyle} onClick={onClose}>
        &times;
      </span> 
        <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-8">
            <label className="block text-gray-700 text-sm font-bold mb-2">
             Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Name"
              defaultValue={referenceData.name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-8">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Mobile Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Mobile No"
              defaultValue={referenceData.mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
            />
          </div>


          <div className="mb-8">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Status
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Status"
              defaultValue={referenceData.status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </div>


          <div className="mb-8">
            <label className="block text-gray-700 text-sm font-bold mb-2">
             Remarks
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Remarks"
              defaultValue={referenceData.remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </div>

          <div style={buttonContainerStyle}>
              <button style={updateButtonStyle} type="button" onClick={handleUpdate}>
                Update Reference
              </button>
              <button style={closeButtonStyle} type="button" onClick={onClose}>
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const modalStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'fixed',
  zIndex: 14,
  top: 0,
  left: 0,
  width: '100%',
  height: '100vh', // Set the height to 100vh
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  overflow: 'hidden', // Hide the scrollbar
};

const modalContentStyle = {
  backgroundColor: 'transparent',
  margin: '0 auto',
  padding: '20px',
  // border: '1px solid #888',
  width: '80%',
};

const closeIconStyle = {
  color: '#aaa',
  float: 'right',
  marginRight:"16px",
  fontSize: '28px',
  fontWeight: 'bold',
  cursor: 'pointer',
};
  
  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
  };
  
  const updateButtonStyle = {
    backgroundColor: 'purple',
    hoverBackgroundColor: 'blue',
    color: 'white',
    fontWeight: 'bold',
    padding: '10px 20px',
    borderRadius: '5px',
    outline: 'none',
    cursor: 'pointer',
  };
  
  const closeButtonStyle = {
    backgroundColor: 'red',
    hoverBackgroundColor: 'red',
    color: 'white',
    fontWeight: 'bold',
    padding: '10px 20px',
    borderRadius: '5px',
    outline: 'none',
    cursor: 'pointer',
  };

export default UpdateReference;
