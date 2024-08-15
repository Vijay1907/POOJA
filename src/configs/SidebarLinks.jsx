import { MdOutlineCategory,MdOutlineInfo } from "react-icons/md";
import { RiContactsBookLine, RiContactsLine } from "react-icons/ri";
import { BsBook } from "react-icons/bs";


export const SideBarLinks = [
    {
        name:"Dashboard",
        to:"/",
        icon:  <svg
        className="min-w-fit w-6 h-6 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    },
    {
        name:"Books",
        to:"/books",
        icon: <MdOutlineCategory/>
    },
    {
        name:"Dhyaan",
        to:"/dhyaan",
        icon: <BsBook/>
    },
    {
        name: "Users",
        to:"/users",
        icon: <RiContactsLine/>
    },
]