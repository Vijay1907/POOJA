import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { privateRequest } from '../../configs/RequestMethod';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateTopic = () => {
  const [image, setImage] = useState(null);
  const [topicName, setTopicName] = useState('');
  const [topicDescription, setTopicDescription] = useState('');
  const [topicUrl, setTopicUrl] = useState('');
  const [topicId, setTopicId] = useState('');
  const navigate = useNavigate();

  const { id } = useParams();
  const subId = id.split("&")[0]
  const topId = id.split("&")[1]

  useEffect(() => {
    const getSingleTopic = async () => {
      try {
        const response = await privateRequest.get(`/study/topic/${topId}`);
        const topicData = response.data.data;

        setTopicId(topicData._id);
        setTopicName(topicData.topicName);
        setTopicDescription(topicData.topicDescription);
        setTopicUrl(topicData.topicUrl)
      } catch (error) {
        console.log(error);
      }
    };

    getSingleTopic();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const payload = {};

      if (topicName) {
        payload.topicName = topicName;
      }

      if (topicDescription) {
        payload.topicDescription = topicDescription;
      }
      if (topicUrl) {
        payload.topicUrl = topicUrl;
      }


      if (image) {
        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', 'dakshin_murti');

        const response = await fetch(
          'https://api.cloudinary.com/v1_1/dkhh3ayz8/auto/upload',
          {
            method: 'POST',
            body: data,
          }
        );
        const result = await response.json();
        payload.topicImg = result.secure_url;
      }

      const updateResponse = await privateRequest.put(
        `/study/topic/${topicId}`,
        payload
      );

      if (updateResponse.data.status === 'success') {
        toast.success('Topic updated successfully!');
        navigate(`/topic/${subId}`); // Redirect to the home page, for example
      } else {
        toast.error('Failed to update topic.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar title={'Update Topic'} />
      <Sidebar />

      <div className="w-full max-w-xl m-auto mt-8 ">
        <form
          className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="mb-8">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Topic Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Topic Name"
              value={topicName}
              onChange={(e) => setTopicName(e.target.value)}
            />
          </div>
          <div className="mb-8">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Topic Description
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Topic Description"
              value={topicDescription}
              onChange={(e) => setTopicDescription(e.target.value)}
            />
          </div>
          <div className="mb-8">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Topic Url
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Topic Description"
              value={topicUrl}
              onChange={(e) => setTopicUrl(e.target.value)}
            />
          </div>

          <div className="flex items-center mb-8 justify-center w-full h-[150px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            {image && (
              <div>
                <img
                  className="max-h-[9rem] object-contain"
                  src={URL.createObjectURL(image)}
                  alt="Uploaded"
                />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <div className="flex items-center justify-end">
            <button
              className="bg-purple-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button" // Change the button type to "button"
              onClick={handleUpdate} // Call the handleUpdate function on button click
            >
              Update Topic
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTopic;
