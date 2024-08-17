import { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import ProfileMenu from "../Pages/ProfileMenu/ProfileMenu";

const Navbar = (props) => {
  const admin = useSelector((state) => state.auth.user);

  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  return (
    <div className="flex justify-between items-center navbar sticky top-0 w-full bg-white border-b-2 z-20 shadow-md">
      <h1 className="text-lg md:text-2xl text-slate-500 p-3 ml-16">
        {props.title}
      </h1>
      <div className="absolute right-0 top-4 flex px-10 items-center">
        <div className="flex items-center mx-4 space-x-2">
          <span className="font-mono text-slate-400 text-lg">{admin?.name || "User"}</span>

          <button onClick={() => setOpenProfileMenu(!openProfileMenu)}>
            <FaRegUserCircle className="text-blue-500 text-xl" />
            {openProfileMenu && <ProfileMenu />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
