import { MdDashboard, MdOutlineCategory } from "react-icons/md";
import { RiContactsLine } from "react-icons/ri";
import { BsBook } from "react-icons/bs";

export const SideBarLinks = [
    {
        name: "Dashboard",
        to: "/",
        icon: <MdDashboard className="w-6 h-6" />
    },
    {
        name: "Books",
        to: "/books",
        icon: <MdOutlineCategory className="w-6 h-6" />
    },
    {
        name: "Dhyaan",
        to: "/dhyaan",
        icon: <BsBook className="w-6 h-6" />
    },
    {
        name: "Users",
        to: "/users",
        icon: <RiContactsLine className="w-6 h-6" />
    },
];
