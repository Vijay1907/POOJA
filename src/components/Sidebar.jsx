import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import CryptoJS from "crypto-js";
import { brandImg } from "../service";
import { SideBarLinks } from "../configs/SidebarLinks";

const Sidebar = () => {
  const [isExpended, setExpended] = useState(true);
  const page = useLocation();

  let user;
  const encryptedUser = localStorage.getItem("user");
  if (encryptedUser) {
    try {
      const decryptedUserBytes = CryptoJS.AES.decrypt(encryptedUser, "your-encryption-key");
      user = JSON.parse(decryptedUserBytes.toString(CryptoJS.enc.Utf8));
    } catch (error) {
      console.error("Error decrypting user data:", error);
    }
  } else {
    console.log("User data not found in localStorage");
  }

  return (
    <div
      className={`${isExpended ? "w-48 bg-[rgba(0,0,0,0.2)]" : "w-16"
        } fixed top-0 left-0 overflow-x-hidden transition-all duration-300 z-50 h-screen`}
    >
      <div
        onMouseOver={() => setExpended(true)}
        onMouseLeave={() => setExpended(false)}
        className="flex items-center h-full"
      >
        <div
          className={`flex flex-col items-center h-full overflow-hidden text-gray-700 bg-white rounded transition-all duration-300 ${isExpended ? 'w-48' : 'w-16'}`}
        >
          <div className={`flex items-center justify-center w-full py-2 transition-transform duration-300`}>
            <img
              src={brandImg}
              alt="Brand"
              className={`transition-transform duration-300 w-10 h-10 ${isExpended ? 'transform scale-125' : ''}`}
            />
          </div>
          <div className="w-full px-2">
            <div className="flex flex-col items-center w-full border-t border-gray-300">
              {SideBarLinks.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className={`flex items-center w-full h-12 px-3 mt-2 rounded
                    ${page.pathname === item.to ? 'bg-slate-700 text-white' : 'hover:bg-slate-600 hover:text-white'} 
                    ${!isExpended && page.pathname === item.to ? 'bg-slate-700' : ''}`}
                >
                  {item.icon}
                  {isExpended && (
                    <span className="ml-2 text-sm font-medium">
                      {item.name}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
