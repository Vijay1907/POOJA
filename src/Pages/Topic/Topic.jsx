import { Link, useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import { BsPencilSquare } from "react-icons/bs"
import {AiFillEye} from "react-icons/ai"
import { BsFillTrashFill } from "react-icons/bs"
import { useEffect, useState } from 'react'
import { privateRequest } from '../../configs/RequestMethod'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Topic = () => {

  const { id } = useParams()


  const [topicList, setTopicList] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getAllTopic = async () => {
    try {
      setIsLoading(true);
      const response = await privateRequest.get(`/study/topics/${id}`);
      console.log(response.data.data);
      setTopicList(response?.data?.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTopic = async (id) => {
    try {
      const response = await privateRequest.delete(`/study/topic/${id}`);
      console.log(response.data.data);
      getAllTopic()
      toast.success("Topic Deleted Successfully!")

    } catch (error) {
      console.log(error);
    }
  };

  const toggleToppicActive = async (id, isActive) => {
    try {
      const response = await privateRequest.put(`/study/topic/${id}`, {
        subjectActive: !isActive,
      });
      console.log(response.data.data);
      getAllTopic();
      toast.success("Topic Updated Successfully!")

    } catch (error) {
      console.log(error);
    }
  };

  // const handleDelete = async (id) => {
  //   try {
  //     await deleteEmployee(id);
  //     getAllEmployee();
  //     setDeleteModal(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const handleCancelDelete = () => {
  //   setDeleteModal(false);
  // };


  useEffect(() => {
    getAllTopic()
  }, [])

  return (
    <div>
      <Navbar title={"Topics"} />
      <Sidebar />

      <div className="flex flex-wrap justify-evenly-items-center ml-16 gap-6 mt-4">
        {topicList?.map((data, index) => {
          return (
            <div key={index} className="max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <img className="rounded-t-lg w-[20rem] m-auto h-[10rem]" src={data.topicImg} alt="this is react images" />
              <div className="p-2">
                <a href="#">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{data.topicName}</h5>
                </a>
                <p className="mb-3 font-normal text-sm text-gray-700 dark:text-gray-400">{data.topicDescription}</p>
                <div className='flex justify-around items-center border-2 p-2 border-purple-300 '>
                  {/* <div className="">
         <label className="relative inline-flex items-center cursor-pointer">
           <input
             type="checkbox"
             checked={data.subjectActive}
             onChange={() => toggleToppicActive(data._id, data.subjectActive)}
             className="sr-only peer"
           />
           <div className={`w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 ${data.subjectActive ? 'peer-focus:ring-blue-300 dark:peer-focus:ring-green-800' : 'peer-focus:ring-red-300 dark:peer-focus:ring-red-800'} rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 ${data.subjectActive ? 'peer-checked:bg-green-600' : 'peer-checked:bg-red-600'}`}></div>
         </label>
       </div> */}
                  <Link to={`/update-topic/${id}&${data._id}`}>
                    <div className="text-2xl text-yellow-500" style={{ cursor: 'pointer' }}>
                      <BsPencilSquare />
                    </div>
                  </Link>
                  {/* <Link to={`/test/${data._id}`}>
                    <div className="text-2xl text-blue-600">
                      <AiFillEye />
                    </div>
                  </Link> */}


                  <div className="text-2xl text-red-600" onClick={() => deleteTopic(data._id)} style={{ cursor: 'pointer' }} >
                    <BsFillTrashFill />
                  </div><Link to={`/add-mcq/${data._id}`} >
                    {
            !data.testAdded && (
        <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-md text-xs px-2 py-2 text-center">Add MCQ</button>
            )
          }
                

                  </Link>
                </div>
              </div>
            </div>
          )
        })}



      </div>
    </div>
  )
}

export default Topic