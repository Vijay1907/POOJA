// src/components/DashBoard/DashBoard.jsx

import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import HeaderSection from "./components/HeaderSection";
import { GETDASHBOARDDATA } from "../../service";
import Loader from "../Loader/Loader";
import { BACKEND_URL } from "../../configs/RequestMethod";
import Rating from "../../components/Rating";

const DashBoard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const [popularBookList, setPopularBookList] = useState([]);
  const [popularDhyaanList, setPopularDhyaanList] = useState([]);

  const getData = async () => {
    try {
      setIsLoading(true);
      let response = await GETDASHBOARDDATA();
      setData(response?.data?.data?.cardCounts);
      setPopularBookList(response?.data?.data?.books.slice(0, 4)); // Show only first 4 books
      setPopularDhyaanList(response?.data?.data?.dhyaans.slice(0, 4)); // Show only first 4 dhyaans
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar title="Dashboard" />
      <div className="flex ml-10">
        <Sidebar />
        <div className="flex-1 p-6 mx-8 relative">
          {isLoading && <Loader />}  {/* Display Loader when loading */}
          <HeaderSection data={data} />

          <div className="mt-12">
            {/* Top Viewed Books Section */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
              <div className="px-6 py-4 bg-indigo-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-indigo-700">Top Viewed Books</h2>
                <span className="text-sm text-indigo-500">Total Books: {popularBookList.length}</span>
              </div>
              {isLoading ? (
                <div className="p-4">Loading...</div>
              ) : (
                <div className="flex overflow-x-auto space-x-9 p-6 ">
                  {popularBookList?.map((book, index) => (
                    <div
                      key={index}
                      className="min-w-[250px] border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 hover:transform hover:scale-105 bg-white p-5"
                    >
                      <div className="flex justify-center items-center h-48">
                        <img
                          src={`${BACKEND_URL}/${book.coverImage}`}
                          alt={book.bookName}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <div className="p-4 pb-0 flex flex-col justify-center items-center bg-white">
                        <Rating rating={book.rating} />
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          {book.bookName}
                        </h3>
                        {/* <p className="text-gray-600 text-sm line-clamp-3">
                          {book.bookDescription}
                        </p> */}
                        <div className="text-sm text-gray-500">
                          <span className="font-medium">Clicks:</span> {book.clicks}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Top Viewed Dhyaans Section */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="px-6 py-4 bg-red-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-red-700">Top Viewed Dhyaans</h2>
                <span className="text-sm text-red-500">Total Dhyaans: {popularDhyaanList.length}</span>
              </div>
              {isLoading ? (
                <div className="p-4">Loading...</div>
              ) : (
                <div className="flex overflow-x-auto space-x-9 p-6">
                  {popularDhyaanList?.map((dhyaan, index) => (
                    <div
                      key={index}
                      className="min-w-[250px] border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 hover:transform hover:scale-105 bg-white p-5"
                    >
                      <div className="flex justify-center items-center h-48">
                        <img
                          src={BACKEND_URL + "/" + dhyaan.dhyanPoster}
                          alt={dhyaan.dhyanName}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <div className="p-4 pb-0 flex flex-col justify-center items-center bg-white">
                        <Rating rating={dhyaan.rating} />
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          {dhyaan.dhyanName}
                        </h3>
                        {/* <p className="text-gray-600 text-sm line-clamp-3">
                          {dhyaan.dhyanDescription}
                        </p> */}
                        <div className="text-sm text-gray-500">
                          <span className="font-medium">Clicks:</span> {dhyaan.clicks}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
