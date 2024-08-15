
import { FaRegComments } from "react-icons/fa";
import { BsBook, BsQuestionOctagon } from "react-icons/bs";
import { privateRequest } from "../../../configs/RequestMethod";
import { useEffect, useState } from "react";
import { GETDASHBOARDCOUNTS } from "../../../service";

const HeaderSection = (props) => {
  const [tilesData, setTilesData] = useState({});

  const getTilesCount = async () => {
    try {
      let data = await GETDASHBOARDCOUNTS()
      setTilesData(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getTilesCount()
  }, [])


  return (
    <div className="flex ml-10 gap-8  ">
      <HeaderCard
        colors="#5b618f"
        icon={<FaRegComments />}
        current="Total Users"
        title="Total Users"
        no={tilesData.userCount}
      />
      <HeaderCard
        colors="#ffa753"
        icon={<BsQuestionOctagon />}
        current="Total Books"
        title="Total Books"
        no={tilesData.bookCount}

      />
      <HeaderCard
        colors="#536df0"
        icon={<BsBook />}
        current="Total Dhyaan"
        title="Total Dhyaan"
        no={tilesData.dhyaanCount}

      />
    </div>
  );
};

const HeaderCard = ({ colors, no, title, icon }) => {
  return (
    <button
      type="button"
      style={{ backgroundColor: colors }}
      className="min-w-[300px] shadow-xl relative inline-flex items-center py-8 px-8 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none dark:focus:ring-blue-800"
    >
      <span className="text-xl mr-3">{icon}</span>
      <span>{title}</span>
      <div
        style={{ backgroundColor: colors }}
        className="absolute inline-flex items-center justify-center w-9 h-9 text-xs font-bold text-white border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900"
      >
        {no}
      </div>
    </button>
  );
};

export default HeaderSection;
