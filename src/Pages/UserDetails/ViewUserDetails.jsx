import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { privateRequest } from "../../configs/RequestMethod";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { AiFillEdit } from "react-icons/ai";
import UpdateReference from './UpdateReference.jsx';

const ViewUserDetails = () => {
  const [videoCollapsed, setVideoCollapsed] = useState(true);
  const [referenceCollapsed, setReferenceCollapsed] = useState(true);
  const [tests, setTests] = useState([]);
  const [subjectTests, setSubjectTests] = useState([]);
  const [reference, setReference] = useState([]);
  const [isUpdateReferenceModalOpen, setIsUpdateReferenceModalOpen] = useState(false);
  const [referenceDataForEdit, setReferenceDataForEdit] = useState(null);
  const [refId, setRefId] = useState(null);
  const [isUpdate, setIsUpdate] = useState(true);

  const toggleVideo = () => {
    setVideoCollapsed(!videoCollapsed);
  };

  const toggleReference = () => {
    setReferenceCollapsed(!referenceCollapsed);
  };

  const [isSubjectCollapsed, setSubjectCollapsed] = useState(true);

  const toggleSubject = () => {
    setSubjectCollapsed(!isSubjectCollapsed);
  };

  let { id } = useParams();
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  console.log(id)

  const getLeadDetails = async () => {
    try {
      setIsLoading(true);
      const response = await privateRequest.get(`/users/singleUser/${id}`);
      console.log(response.data)
      setUserData(response?.data?.user);
      setReference(response?.data?.user?.reference)
      console.log("usersref------------", response.data.user.reference)
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);

    }
  };

  const getTestDetails = async () => {
    try {
      setIsLoading(true);
      const response = await privateRequest.get(`/users/submitTests/${id}`);
      setTests(response?.data?.data);
      console.log("tests", response?.data?.data)
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);

    }
  };

  const getSubjectTestDetails = async () => {
    try {
      setIsLoading(true);
      const response = await privateRequest.get(`/users/submitSubjectTests/${id}`);
      setSubjectTests(response?.data?.data);
      console.log("tests", response?.data?.data)
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);

    }
  };

  useEffect(() => {
    getLeadDetails();
    getTestDetails()
    getSubjectTestDetails()

  }, [id, isUpdate]);

  const openUpdateReferenceModal = (referenceItem) => {
    setReferenceDataForEdit(referenceItem);
    setRefId(referenceItem._id)
    setIsUpdateReferenceModalOpen(true);
  };

  const closeUpdateReferenceModal = () => {
    setReferenceDataForEdit(null);
    setIsUpdateReferenceModalOpen(false);
  };

  return (
    <>
      {isLoading === true ? (
        "Loading..."
      ) : (
        <div>
          <Navbar title={"User Details"} />
          <Sidebar />


          <div className="ml-20 mt-4">
            <h1 className="bg-purple-400 py-4 px-6 text-xl text-white font-semibold">
              Personal Details
            </h1>
            <div className="grid grid-cols-5 gap-4 items-start p-6 bg-white pb-5 space-y-6 ">
              <div>
                <p className="font-semibold text-lg">User Name</p>
                <p>{userData.name}</p>
              </div>
              <div>
                <p className="font-semibold text-lg">State</p>
                <p>{userData.state}</p>
              </div>
              <div>
                <p className="font-semibold text-lg">District</p>
                <p>{userData.district}</p>
              </div>
              <div>
                <p className="font-semibold text-lg">
                  Mobile Number
                  {/*  */}
                </p>
                <p>{userData.mobileNo}</p>
              </div>
              <div>
                <p className="font-semibold text-lg">
                  Status
                </p>
                <p>{userData.active}</p>
              </div>
              <div className="grid col-span-5">
                <div className="flex space-x-8">
                  {userData?.reference?.map((ref, index) => {
                    return (
                      <div key={index}>
                        <h1 className="font-semibold text-lg">
                          Refernce {index + 1}
                        </h1>
                        <div className="flex">
                          <p>
                            Refernce Name :
                          </p>
                          <p className="font-bold mx-2">{ref.name}</p>
                        </div>
                        <div className="flex">
                          <p>
                            Refernce Mobile No :
                          </p>
                          <p className="font-bold mx-2">{ref.mobileNo}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>


            </div>


            <div className="my-8">
              <h1 className="bg-purple-400 py-4 px-6 text-xl text-white font-semibold flex justify-between items-center">
                Video Test Details
                <button onClick={toggleVideo} className="text-white">
                  {videoCollapsed ? <FaChevronDown /> : <FaChevronUp />}
                </button>
              </h1>

              {!videoCollapsed && (tests.length > 0 ? (
                <div className="overflow-auto my-2">
                  <table className="w-[100%] border-collapse">
                    {/* head */}
                    <thead className="bg-purple-400 text-white sticky top-0">
                      <tr>
                        <th>S.no.</th>
                        <th>Subject Name</th>
                        <th>Topic Name</th>
                        <th>Test Name</th>
                        <th>Score</th>
                        <th>Duration</th>
                      </tr>
                    </thead>

                    {/* body */}
                    <tbody>
                      {tests.map((item, index) => (
                        <tr
                          className={
                            index % 2 === 1
                              ? "text-center bg-[#D4E6FF]"
                              : "text-center"
                          }
                          key={index}
                        >
                          <td className="py-3 items-center flex justify-center">
                            {index + 1}
                          </td>
                          <td>{item?.subjectId?.subjectName}</td>
                          <td>{item?.topicId?.topicName}</td>
                          <td>{item?.testId?.testName}</td>
                          <td>{item.score}</td>
                          <td>{item.duration} min</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center text-xl font-semibold my-2">
                  No data found
                </div>
              ))}


            </div>


            <div className="my-8">
              <h1 className="bg-purple-400 py-4 px-6 text-xl text-white font-semibold flex justify-between items-center">
                Subject Test Details
                <button onClick={toggleSubject} className="text-white">
                  {isSubjectCollapsed ? <FaChevronDown /> : <FaChevronUp />}
                </button>
              </h1>

              {(!isSubjectCollapsed && subjectTests?.length > 0) ? (
                <div className="overflow-auto mt-2">
                  <table className="w-[100%] border-collapse">
                    {/* head */}
                    <thead className="bg-purple-400 text-white sticky top-0">
                      <tr>
                        <th>S.no.</th>
                        <th>Subject Name</th>
                        <th>Test Name</th>
                        <th>Score</th>
                        <th>Duration</th>
                      </tr>
                    </thead>


                    {/* body */}
                    <tbody>
                      {subjectTests.map((item, index) => (
                        <tr
                          className={
                            index % 2 === 1
                              ? 'text-center bg-[#D4E6FF]'
                              : 'text-center'
                          }
                          key={index}
                        >
                          <td className="py-3 items-center flex justify-center">
                            {index + 1}
                          </td>
                          <td>{item.subjectId.subjectName}</td>
                          <td>{item.subjectTestId.testName}</td>
                          <td>{item.score}</td>
                          <td>{item.duration} min</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                isSubjectCollapsed ? null : (
                  <div className="text-center text-xl font-semibold mt-2">
                    No data found
                  </div>
                )
              )}
            </div>



            <div className="my-8">
              <h1 className="bg-purple-400 py-4 px-6 text-xl text-white font-semibold flex justify-between items-center">
                Reference Details
                <button onClick={toggleReference} className="text-white">
                  {referenceCollapsed ? <FaChevronDown /> : <FaChevronUp />}
                </button>
              </h1>

              {(!referenceCollapsed && reference?.length > 0) ? (
                <div className="h-[calc(60vh-120px)] overflow-auto my-2">
                  <table className="w-[100%] border-collapse">
                    {/* head */}
                    <thead className="bg-purple-400 text-white sticky top-0">
                      <tr>
                        <th>S.no.</th>
                        <th>Name</th>
                        <th>Mobile No</th>
                        <th>Status</th>
                        <th>Remarks</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    {/* body */}
                    <tbody>
                      {reference.map((item, index) => (
                        <tr
                          className={
                            index % 2 === 1
                              ? 'text-center bg-[#D4E6FF]'
                              : 'text-center'
                          }
                          key={index}
                        >
                          <td className="py-3 items-center flex justify-center">
                            {index + 1}
                          </td>
                          <td>{item.name}</td>
                          <td>{item.mobileNo}</td>
                          <td>{item.status ? item.status : '-'}</td>
                          <td>{item.remarks ? item.remarks : '-'}</td>
                          <td className="text-center cursor-pointer" onClick={() => openModal(item)}>
                            <AiFillEdit className="w-[100%]" onClick={() => openUpdateReferenceModal(item)} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                referenceCollapsed ? null : (
                  <div className="text-center text-xl font-semibold my-2">
                    No data found
                  </div>
                )
              )}
            </div>



          </div>


        </div>
      )}


      <UpdateReference
        isOpen={isUpdateReferenceModalOpen}
        onClose={closeUpdateReferenceModal}
        refId={refId}
        userId={userData._id}
        setIsUpdate={setIsUpdate}
        referenceData={referenceDataForEdit}
      />

    </>
  );
};

export default ViewUserDetails;