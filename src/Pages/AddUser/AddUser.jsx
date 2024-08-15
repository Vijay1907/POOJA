import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useState, useEffect } from 'react';
import { privateRequest } from "../../configs/RequestMethod";
import { AiOutlineClose } from 'react-icons/ai';
import { toast } from 'react-toastify';
import "../../App.css"
import UserDetails from "../UserDetails/UserDetails";

const AddUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNo: '',
    password: '',
    confirmPassword: '', // Add confirm password field
    permissions: [], // Array to store selected permissions
  });

  const allPermissions = ['Dashboard', 'Subject', 'MCQ Subject', 'Contact Us', 'About Us', 'Add User'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      if (checked) {
        setFormData({ ...formData, permissions: [...formData.permissions, value] });
      } else {
        setFormData({ ...formData, permissions: formData.permissions.filter((permission) => permission !== value) });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const getUsers = async () => {
    try {
      const response = await privateRequest.get('/users/getSubAdmins');
      const usersData = response.data.data;
      setUsers(usersData);
      toast.success(usersData.message);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async () => {
    try {
      const updateResponse = await privateRequest.post('/users/addSubAdmin', formData);

      if (updateResponse.data.status === 'success') {
        getUsers();
        toast.success('User added successfully!');
        setIsOpen(false);
        setFormData({
          name: '',
          email: '',
          mobileNo: '',
          password: '',
          confirmPassword: '',
          permissions: [],
        });
      } else {
        toast.error('Failed to add User');
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
      <Sidebar />
      <Navbar title={'Users'} />

      <div className="flex flex-col bg-white ml-10 ">
        <UserDetails />

      </div>
    </>
  );

}

export default AddUser;





