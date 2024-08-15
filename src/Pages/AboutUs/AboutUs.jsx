import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useState, useEffect } from 'react';
import { privateRequest } from "../../configs/RequestMethod";

const AboutUs = () => {
  const [aboutData, setAboutData] = useState([]);
  useEffect(() => {
    const getAbout = async () => {
      try {
        const response = await privateRequest.get(`/users/aboutUs`);
        const aboutData = response.data.data;
       setAboutData(aboutData)
       console.log("----",aboutData)
      } catch (error) {
        console.log(error);
      }
    };

    getAbout();
  }, []);
  return (
    <>
      <Sidebar />
      <Navbar title={"About Us"} />

      <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="w-full p-4 flex justify-end mr-8">
            <Link to="/add-about">

              <button className="px-7 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">Add more Section</button>
            </Link>
          </div>


        

{
  aboutData.map((item,index)=>(
    <>
    <div className={`bg-white  rounded-lg ${index== 0 ? "mt-5" : "mt-14"} ${index== aboutData.length-1 ? "mb-14" : "mb-5"}`}>
     <div className="w-full p-4 flex justify-end mr-8">
            <Link to={`/update-about/${item._id}`}>

              <button className="px-7 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">Edit</button>
            </Link>
          </div>

          <div className="flex flex-col md:flex-row w-full max-w-4xl p-8 mb-6">

            {/* Left Section */}
            <div className="md:w-1/2 mr-5">
              <img
                style={{ width: "100%", borderRadius: "23px" }}
                src={item.img}
                alt="About Us"
                className="w-full h-auto"
              />
            </div>

            {/* Right Section */}
            <div className="md:w-1/2 px-8 flex flex-col justify-center bg-white rounded-lg shadow-md">
              <div className="mb-4">
                <h1 className="text-4xl font-bold">{item.title}</h1>
              </div>
              <div className="mb-4">
                <p className="text-gray-700 mt-[13px]">
                  {item.desc}
                </p>
              </div>
              <div>
                <button className="bg-blue-500 mt-[23px] text-white py-2 px-4 rounded mb-3">
                  Learn More
                </button>
              </div>
            </div>

            </div>
          </div>
    </>
  ))
}
         

       
      </div>
    </>
  );
};

export default AboutUs;
