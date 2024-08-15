import  { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import useDynamicCrud from '../../hooks/useDynamicCrud';
import { toast } from 'react-toastify';

function AddLecture() {
  const {
    createItem,
    createError,
  } = useDynamicCrud("http://localhost:3000/api/v1/lectures");
  const [image , setImage] = useState('')
  console.log(image)
  const [subjects, setSubjects] = useState([
    {
      subjectName: '',
      subjectDescription: '',
      subjectImage: '',
      topics: [
        {
          topicName: '',
          topicDetails: '',
          topicVideo: '',
          topicLink: '',

        },
      ],
    },
  ]);

  const handleSubjectChange = (index, field, value) => {
    const newSubjects = [...subjects];
    newSubjects[index][field] = value;
    setSubjects(newSubjects);
  };

  const handleTopicChange = (subjectIndex, topicIndex, field, value) => {
    const newSubjects = [...subjects];
    newSubjects[subjectIndex].topics[topicIndex][field] = value;
    setSubjects(newSubjects);
  };

  const addSubject = () => {
    setSubjects([
      ...subjects,
      {
        subjectName: '',
        subjectDescription: '',
        subjectImage: '',
        topics: [
          {
            topicName: '',
            topicDetails: '',
            topicVideo: '',
            topicLink: '',
          },
        ],
      },
    ]);
  };

  const addTopic = (subjectIndex) => {
    const newSubjects = [...subjects];
    newSubjects[subjectIndex].topics.push({
      topicName: '',
      topicDetails: '',
      topicVideo: '',
      topicLink: '',
    });
    setSubjects(newSubjects);
  };

  const deleteSubject = (subjectIndex) => {
    if (subjects.length > 1) {
      const newSubjects = [...subjects];
      newSubjects.splice(subjectIndex, 1);
      setSubjects(newSubjects);
    }
  };

  const deleteTopic = (subjectIndex, topicIndex) => {
    if (subjects[subjectIndex].topics.length > 1) {
      const newSubjects = [...subjects];
      newSubjects[subjectIndex].topics.splice(topicIndex, 1);
      setSubjects(newSubjects);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await createItem(subjects);
      console.log(response)

      // Assuming the response includes a success message
      if (response.statusText === "Created") {
        toast.success('Lectures added successfully');
        // Clear the form after successful submission
        setSubjects([
          {
            subjectName: '',
            subjectDescription: '',
            subjectImage: '',
            topics: [
              {
                topicName: '',
                topicDetails: '',
                topicVideo: '',
                topicLink: '',
              },
            ],
          },
        ]);
      } else {
        toast.error('Failed to add lectures');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while adding lectures');
    }
  };
 

 

  return (
    <>
    <Sidebar />
      <Navbar title="Add Lectures" />
      <div className="container mx-auto px-4 py-8 pl-6">
      <div className="">
        <div className="grid grid-cols-1">
        {subjects.map((subject, subjectIndex) => (
          <div key={subjectIndex} className="mb-6 p-4 bg-purple-100 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Subject {subjectIndex + 1}</h2>
            <input
              type="text"
              placeholder="Subject Name"
              value={subject.subjectName}
              onChange={(e) => handleSubjectChange(subjectIndex, 'subjectName', e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Subject Description"
              value={subject.subjectDescription}
              onChange={(e) => handleSubjectChange(subjectIndex, 'subjectDescription', e.target.value)}
              className="w-full mt-2 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <input
              type="file"
              placeholder="Subject Image"
              // value={subject.subjectImage}
              // onChange={(e) => handleSubjectChange(subjectIndex, 'subjectImage', e.target.value)}
              onChange={(e) => console.log(e)}
              className="w-full mt-2 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            {/* Add more input fields for other subject properties */}
            {subjectIndex !== 0 && (
              <button
                type="button"
                onClick={() => deleteSubject(subjectIndex)}
                className="mt-4 px-3 py-2 bg-red-500 text-white rounded-md focus:outline-none focus:bg-red-600"
              >
                Delete Subject
              </button>
            )}
            {subject.topics.map((topic, topicIndex) => (
              <div key={topicIndex} className="mt-4 p-2 bg-white rounded-md border border-gray-300">
                <input
                  type="text"
                  placeholder="Topic Name"
                  value={topic.topicName}
                  onChange={(e) => handleTopicChange(subjectIndex, topicIndex, 'topicName', e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Topic Details"
                  value={topic.topicDetails}
                  onChange={(e) => handleTopicChange(subjectIndex, topicIndex, 'topicDetails', e.target.value)}
                  className="w-full mt-2 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="file"
                  placeholder="Topic Video"
                  value={topic.topicVideo}
                  onChange={(e) => handleTopicChange(subjectIndex, topicIndex, 'topicVideo', e.target.value)}
                  className="w-full mt-2 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Topic Link"
                  value={topic.topicLink}
                  onChange={(e) => handleTopicChange(subjectIndex, topicIndex, 'topicLink', e.target.value)}
                  className="w-full mt-2 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                
                {/* Add more input fields for other topic properties */}
                {topicIndex !== 0 && (
                  <button
                    type="button"
                    onClick={() => deleteTopic(subjectIndex, topicIndex)}
                    className="mt-2 px-2 py-1 bg-red-500 text-white rounded-md focus:outline-none focus:bg-red-600"
                  >
                    Delete Topic
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addTopic(subjectIndex)}
              className="mt-4 px-3 py-2 bg-blue-500 text-white rounded-md focus:outline-none focus:bg-blue-600"
            >
              Add Topic
            </button>
          </div>
        ))}
        </div>
        <button
          type="button"
          onClick={addSubject}
          className="mt-6 px-4 py-2 bg-green-500 text-white rounded-md focus:outline-none focus:bg-green-600"
        >
          Add Subject
        </button>
        <button
        onClick={handleSubmit}
          className="mt-6 ml-4 px-4 py-2 bg-purple-500 text-white rounded-md focus:outline-none focus:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </div>
    </>
    
  );
}

export default AddLecture;
