import { toast } from "react-toastify";
import { privateRequest } from "./configs/RequestMethod";
import Cookies from 'js-cookie';
import { changeUserData, login, logout } from "./features/auth-slice";
const jwtToken = Cookies.get('jwtToken');

export const loginPageImg = "https://pngfre.com/wp-content/uploads/hanuman-36-281x300.png"
const pdfUrl = "https://www.hindutemplealbany.org/wp-content/uploads/2016/08/Sri_Hanuman_Chalisa_Hindi.pdf"
const dhyaanPoster= "https://cdn.exoticindia.com/images/products/original/books/gpa229.jpg"
const coverImage="https://m.media-amazon.com/images/I/715smRhK8JL._AC_UF1000,1000_QL80_.jpg"

export const brandImg ="https://w7.pngwing.com/pngs/898/783/png-transparent-om-namaste-hinduism-symbol-yoga-hindu-gods-text-trademark-logo.png"

const dhyaans = [
    {
        _id: "123",
        dhyaanName: "Geeta",
        dhyaanDescription: "Geeta is the holy book",
        dhyaanPoster,
        active: false,
        added:true,
        clicks:3,
    },
    {
        _id: "1231",
        dhyaanName: "Geeta",
        dhyaanDescription: "Geeta is the holy book",
        dhyaanPoster,
        active: false,
        added:true,
        clicks:37,
    },
    {
        _id: "1232",
        dhyaanName: "Geeta",
        dhyaanDescription: "Geeta is the holy book",
        dhyaanPoster,
        active: false,
        added:true,
        clicks:3,
    },
    {
        _id: "1233",
        dhyaanName: "Geeta",
        dhyaanDescription: "Geeta is the holy book",
        dhyaanPoster,
        active: false,
        added:true,
        clicks:3,
    },
    {
        _id: "1293",
        dhyaanName: "Geeta",
        dhyaanDescription: "Geeta is the holy book",
        dhyaanPoster,
        active: false,
        added:true,
    },
   
]

const books = [
    {
        _id: "123",
        bookName: "Geeta",
        bookDescription: "Geeta is the holy book",
        coverImage:coverImage,
        bookPdf: pdfUrl,
        active: false,
        added:false,
    },
    {
        _id: "124",
        bookName: "Geeta",
        bookDescription: "Geeta is the holy book",
        coverImage:coverImage,
        bookPdf: pdfUrl,
        active: true,
        added:true,
        clicks:3,
    },
    {
        _id: "125",
        bookName: "Geeta",
        bookDescription: "Geeta is the holy book",
        coverImage:coverImage,
        bookPdf: pdfUrl,
        active: true,
        added:true,
        clicks:3,
    },
    {
        _id: "126",
        bookName: "Geeta",
        bookDescription: "Geeta is the holy book",
        coverImage:coverImage,
        bookPdf: pdfUrl,
        active: false,
        added:true,
        clicks:3,
    },
    {
        _id: "127",
        bookName: "Geeta",
        bookDescription: "Geeta is the holy book",
        coverImage:coverImage,
        bookPdf: pdfUrl,
        active: true,
        added:true,
        clicks:3,
    },
]

const users = [
    {
        _id:"1",
        email:"neha@gmail.com",
        createdAt:"2024-03-27T06:09:11.510+00:00",
        active:true
    },
    {
        _id:"2",
        email:"sohan@gmail.com",
        createdAt:"2024-03-27T06:09:11.510+00:00",
        active:true
    },
    {
        _id:"3",
        email:"neh2a@gmail.com",
        createdAt:"2024-03-27T06:09:11.510+00:00",
        active:true
    },
    {
        _id:"4",
        email:"neha@gmail.com",
        createdAt:"2024-03-27T06:09:11.510+00:00",
        active:true
    },
]

export const USERLOGIN = async (formData, navigate, dispatch) => {
    // const response = await privateRequest.post('/users/adminLogin', formData);
    const response = {
        data: {
            token: "41331313131312313131313313123",
            user: {
                name: "Karan Kohli",
                role: "Admin",
                email: "karan@gmail.com"
            },
            message: "Logged in Successfully"
        }
    }
    dispatch(login(response?.data));
    const { token } = response.data;
    Cookies.set('jwtToken', token);
    toast.success(response.data.message)
    navigate('/')
}

export const USERLOGOUT =( navigate, dispatch) => {
    dispatch(logout());
    Cookies.remove('jwtToken');
    toast.success('Logged Out Successfully');
    navigate("/login");
}

export const UPDATEADMINDETAILS = async (formData, dispatch) => {
    // const response = await privateRequest.post('/users/updateAdmin', formData);
    const response = {
        data: {
            user: {
                name: "Vijay Raj",
                role: "Admin",
                email: "vijay@gmail.com"
            },
            message: "Profile Updated Successfully"
        }
    }
    dispatch(changeUserData(response?.data));
    toast.success(response.data.message)
}

export const CHANGEPASSWORD = async (formData, navigate,dispatch) => {
    // const response = await privateRequest.post('/users/changePassword', formData);
    const response = {
        data: {
            success:true,
            message: "Password Changed Successfully"
        }
    }
    dispatch(logout(response?.data));
    toast.success(response.data.message)
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    navigate('/login'); 
}

export const GETDASHBOARDDATA = async () => {
    // const response = await privateRequest.get('/users/adminDashboard', {
    //     headers: {
    //         Authorization: `Bearer ${jwtToken}`,
    //     },
    // });
    const response = {
        data: {
            cardCounts:{
                userCount: 16,
                bookCount: 12,
                dhyaanCount: 34
            },
            books:books,
            dhyaans:dhyaans
        }
    }
    return response
}

export const ADDBOOK = async (formData) => {
    // const response = await privateRequest.post("/book", formData, {
    //     headers: {
    //         Authorization: `Bearer ${jwtToken}`,
    //         'Content-Type': 'multipart/form-data'
    //     }
    // });
    const response = {
        data: {
            success: true,
            message: "Book added successfully"
        }
    }
    return response
}

export const GETBOOKS = async () => {
    // const response = await privateRequest.get("/book");
    const response = {
        data: {
            success: true,
            data: books
        }
    }
    return response
}

export const UPDATEBOOK = async (formData, id) => {
    // const response = await privateRequest.put(`/book/${id}`,formData,{
    //    headers: {
    //         Authorization: `Bearer ${jwtToken}`,
    //         'Content-Type': 'multipart/form-data'
    //     }
    // });
    const response = {
        data: {
            success: true,
            message: "Book Updated Successfully",
        }
    }
    return response
}

export const DELETEBOOK = async (id) => {
    // const response = await privateRequest.delete(`/book/${id}`,{
    //    headers: {
    //         Authorization: `Bearer ${jwtToken}`,
    //     }
    // });
    const response = {
        data: {
            success: true,
            message: "Book Deleted Successfully",
        }
    }
    return response
}

export const ADDDHYAAN = async (formData) => {
    // const response = await privateRequest.post("/dhyaan", formData, {
    //     headers: {
    //         Authorization: `Bearer ${jwtToken}`,
    //         'Content-Type': 'multipart/form-data'
    //     }
    // });
    const response = {
        data: {
            success: true,
            message: "Dhyaan added successfully"
        }
    }
    return response
}

export const GETDHYAAN = async () => {
    // const response = await privateRequest.get("/dhyaan");
    const response = {
        data: {
            success: true,
            data: dhyaans
        }
    }
    return response
}

export const UPDATEDHYAAN = async (formData, id) => {
    // const response = await privateRequest.put(`/dhyaan/${id}`,formData,{
    //    headers: {
    //         Authorization: `Bearer ${jwtToken}`,
    //         'Content-Type': 'multipart/form-data'
    //     }
    // });
    const response = {
        data: {
            success: true,
            message: "Dhyaan Updated Successfully",
        }
    }
    return response
}

export const DELETEDHYAAN = async (id) => {
    // const response = await privateRequest.delete(`/dhyaan/${id}`,{
    //    headers: {
    //         Authorization: `Bearer ${jwtToken}`,
    //     }
    // });
    const response = {
        data: {
            success: true,
            message: "Dhyaan Deleted Successfully",
        }
    }
    return response
}

export const GETUSERS = async (id) => {
    // const response = await privateRequest.get(`/allUsers/`,{
    //    headers: {
    //         Authorization: `Bearer ${jwtToken}`,
    //     }
    // });
    const response = {
        data: {
            success: true,
            data:users
        }
    }
    return response
}

export const FORGOTPASSWORD = async (formData) => {
    // const response = await privateRequest.post("/user/forgotPassword", formData, {
    // });
    const response = {
        data: {
            success: true,
        }
    }
    return response
}

export const VERIFYOTP = async (formData) => {
    // const response = await privateRequest.post("/user/verifyOTP", formData, {
    // });
    const response = {
        data: {
            success: true,
        }
    }
    return response
}

export const RESETPASSWORD = async (formData,navigate) => {
    // const response = await privateRequest.post("/user/resetPassword", formData, {
    // });
    const response = {
        data: {
            success: true,
            message:"Password Reset Successfully. You can login now."
        }
    }
    navigate("/login")
    return response
}





