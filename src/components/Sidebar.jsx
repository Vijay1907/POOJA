import { Link, useLocation } from "react-router-dom";
// import Cookies from 'js-cookie';
import { useState } from "react";
import { frontendUrl } from "../configs/RequestMethod";
import { SideBarLinks } from "../configs/SidebarLinks";
import CryptoJS from "crypto-js";


const Sidebar = () => {
  const [isExpended, setExpended] = useState(false);
  const page = useLocation();

  // const user = JSON.parse(Cookies.get('user'));

  let user
  const encryptedUser = localStorage.getItem("user");
  if (encryptedUser) {
    try {
      const decryptedUserBytes = CryptoJS.AES.decrypt(encryptedUser, "your-encryption-key");

      user = JSON.parse(decryptedUserBytes.toString(CryptoJS.enc.Utf8));

      console.log("Decrypted User Data:", user);

    } catch (error) {
      console.error("Error decrypting user data:", error);
    }
  } else {
    console.log("User data not found in localStorage");
  }



  return (
    <div
      className={`${isExpended ? "w-full bg-[rgba(0,0,0,0.2)]" : "w-fit"
        } fixed top-0 left-0 overflow-x-hidden transition-colors duration-100`}
      style={{ zIndex: 12 }}
    >
      <div
        onMouseOver={() => setExpended(true)}
        onMouseLeave={() => setExpended(false)}
        className="flex items-center  w-fit h-screen space-x-6"
      >
        <div
          className={`flex flex-col items-center ${isExpended ? "w-48" : "w-16"
            } h-full overflow-hidden text-gray-700 bg-white rounded transition-all duration-200 text-clip whitespace-nowrap	`}
        >
          <a className="flex items-center w-full px-3 mt-3" href="/">
            {isExpended ? (
              <span className="text-sm font-bold">
                <img
                  src={`${frontendUrl}/images/6.png`}

                  alt=""
                  className="min-w-fit w-8 h-8 stroke-current"
                />
              </span>
            ) : (
              <img
                // src="./images/6.png"
                alt=""
                className="min-w-fit w-8 h-[32px] stroke-current"
              />
            )}
          </a>
          <div className="w-full px-2">
            <div className="flex flex-col items-center w-full mt-3 border-t border-gray-300">
              {SideBarLinks.map((item) => (

                <Link
                  key={item.name}
                  to={item.to}
                  className={`flex items-center w-full h-12 px-3 mt-2  rounded hover:bg-slate-600 hover:text-white`}
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
