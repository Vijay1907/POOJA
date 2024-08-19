import { FaUsers, FaBrain, FaPrayingHands } from "react-icons/fa";
import { BsFillBookFill } from "react-icons/bs";

const HeaderSection = ({ data }) => {
  return (
    <div className="flex gap-8">
      <HeaderCard
        colors="#5b618f"
        icon={<FaUsers />}
        current="Total Users"
        title="Total Users"
        no={data.userCount}
      />
      <HeaderCard
        colors="#ffa753"
        icon={<BsFillBookFill />}
        current="Total Books"
        title="Total Books"
        no={data.bookCount}
      />
      <HeaderCard
        colors="#536df0"
        icon={<FaPrayingHands />}
        current="Total Dhyaan"
        title="Total Dhyaan"
        no={data.dhyaanCount}
      />
    </div>
  );
};

const HeaderCard = ({ colors, no, title, icon }) => {
  return (
    <button
      type="button"
      style={{ backgroundColor: colors }}
      className="min-w-[300px] shadow-xl relative inline-flex items-center py-8 px-8 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none"
    >
      <span className="text-xl mr-3">{icon}</span>
      <div className="flex flex-col items-center">
        <span>{title}</span>
        <div
          style={{ backgroundColor: colors }}
          className="absolute inline-flex items-center justify-center w-9 h-9 text-xs font-bold text-white border-2 border-white rounded-full -top-2 -right-2"
        >
          {no}
        </div>
      </div>
    </button>
  );
};

export default HeaderSection;
