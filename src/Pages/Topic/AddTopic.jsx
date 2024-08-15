import  { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { useNavigate, useParams } from 'react-router-dom';
import { privateRequest } from '../../configs/RequestMethod';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddTopic = () => {

    const {id} = useParams()
    const navigate = useNavigate()

  const [image, setImage] = useState(null);
  const [openAddTopic,setOpenAddTopic] = useState(true)


  const [topics, setTopics] = useState([
    {
      topicName: '',
      topicDescription: '',
      topicImg: '', // Changed to 'topicImg' to match your desired payload
      topicUrl: '',
    },
  ]);


  const handleTopicChange = (index, field, value) => {
    const updatedTopics = [...topics];
    updatedTopics[index][field] = value;
    setTopics(updatedTopics);
    let n= topics.length
    if(topics[n-1].topicName && topics[n-1].topicDescription && topics[n-1].topicUrl ){
      console.log("---",topics)
      setOpenAddTopic(false)
     }else{
      setOpenAddTopic(true)
     }
  };

  const addTopic = () => {
    if(!openAddTopic){
    setTopics([...topics, { topicName: '', topicDescription: '', topicThumbnail: '', topicUrl: '' }]);
    setOpenAddTopic(true)
    }
  };

  const deleteTopic = (index) => {
    const updatedTopics = topics.filter((_, i) => i !== index);
    setTopics(updatedTopics);
    let n= topics.length
    if(topics[n-1].topicName && topics[n-1].topicDescription && topics[n-1].topicUrl ){
      console.log("---",topics)
      setOpenAddTopic(false)
     }else{
      setOpenAddTopic(true)
     }
  };


 

  // Rest of your code remains the same...

  const submitImage = async () => {
    if (image) {
      const data = new FormData();
      data.append('file', image);
      data.append('upload_preset', 'dakshin_murti');

      try {
        const response = await fetch(
          'https://api.cloudinary.com/v1_1/dkhh3ayz8/auto/upload',
          {
            method: 'POST',
            body: data,
          }
        );
        const result = await response.json();
        console.log(result);

        // Update the 'topicImg' field for each topic with the Cloudinary image URL
        const updatedTopics = topics.map((topic) => ({
          ...topic,
          topicImg: result.secure_url,
        }));

        // Attach subjectId to each topic
        const topicsWithSubjectId = updatedTopics.map((topic) => ({
          ...topic,
          subjectId: id,
        }));

        try {
          const response = await privateRequest.post('/study/topic', {
            subjectId: id,
            topics: topicsWithSubjectId,
          });
          console.log(response.data);
          navigate('/subject')
          toast.success('Topic added successfully!');
        } catch (error) {
          console.error(error);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call the function to upload image to Cloudinary
    await submitImage();

    // Clear form fields after submission
    setImage(null);
  };

 

  return (
    <div className="">
        <Navbar title={"Add-Topic"}/>
        <Sidebar/>
      <div className="flex flex-wrap gap-4 ml-20 mt-4">
      {topics.map((topic, index) => (
        <div key={index} className="max-w-sm border p-4 mb-4 bg-slate-100">
          <input
            type="text"
            placeholder="Topic Name"
            value={topic.topicName}
            onChange={(e) => handleTopicChange(index, 'topicName', e.target.value)}
            className="shadow appearance-none border mb-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          
          <input
            type="text"
            placeholder="Topic Description"
            value={topic.topicDescription}
           
            className="shadow appearance-none border mb-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => handleTopicChange(index, 'topicDescription', e.target.value)}
          />
          
          
          <input
            type="text"
            placeholder="Topic URL"
            value={topic.topicUrl}
            onChange={(e) => handleTopicChange(index, 'topicUrl', e.target.value)}
            className="shadow appearance-none border mb-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <div className="flex items-center mb-8 justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            {image && (
              <div>
                <img
                  className="max-h-[9rem] object-contain"
                  src={URL.createObjectURL(image)} // Display the selected image
                  alt="Uploaded"
                 />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              className=""
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
         {
          index!== 0 && (
            <div className="flex justify-between">
            <button onClick={() => deleteTopic(index)} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
              Delete
            </button>
          </div>
          )
         }
        </div>
      ))}
      </div>
      <div className="flex gap-4 mx-20">
        <button disabled={openAddTopic} onClick={addTopic} className={`text-white ${openAddTopic ? "bg-gray-500" : "bg-gradient-to-r from-green-400 via-green-500 to-green-600"} hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`}>
          Add Topic
        </button>
        <button onClick={handleSubmit} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddTopic;
