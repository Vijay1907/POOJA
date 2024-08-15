import classes from "./ProfileMenu.module.css";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FiSettings } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth-slice";
import { toast } from "react-toastify";

export default function ProfileMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAccount = () => {
    dispatch(logout());
    navigate("/login");
    toast.success('Logged Out Successfully');

  };

  return (
    <div className={classes.profileDropdown}>
      <ul className="space-y-2 ">
        <Link to="/profile">
          <li className="flex hover:text-[#0A9AE3] items-center font-semibold my-1">
            <CgProfile className="mx-2" />
            Profile
          </li>
        </Link>

        <button
          onClick={logoutAccount}
          className="flex hover:text-[#0A9AE3] items-center font-semibold my-1"
        >
          <FiSettings className="mx-2" />
          Logout
        </button>
      </ul>
    </div>
  );
}