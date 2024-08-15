import { toast } from "react-toastify";
import { privateRequest } from "./configs/RequestMethod";
import Cookies from 'js-cookie';
import { login } from "./features/auth-slice";
const jwtToken = Cookies.get('jwtToken');
const pdfUrl = "https://www.hindutemplealbany.org/wp-content/uploads/2016/08/Sri_Hanuman_Chalisa_Hindi.pdf"


const books = [
    {
        _id: "123",
        bookName: "Geeta",
        bookDescription: "Geeta is the holy book",
        coverImage: "https://media.istockphoto.com/id/173015527/photo/a-single-red-book-on-a-white-surface.jpg?s=612x612&w=0&k=20&c=AeKmdZvg2_bRY2Yct7odWhZXav8CgDtLMc_5_pjSItY=",
        bookPdf: pdfUrl,
        active: false
    },
    {
        _id: "124",
        bookName: "Geeta",
        bookDescription: "Geeta is the holy book",
        coverImage: "https://media.istockphoto.com/id/173015527/photo/a-single-red-book-on-a-white-surface.jpg?s=612x612&w=0&k=20&c=AeKmdZvg2_bRY2Yct7odWhZXav8CgDtLMc_5_pjSItY=",
        bookPdf: pdfUrl,
        active: true
    },
    {
        _id: "125",
        bookName: "Geeta",
        bookDescription: "Geeta is the holy book",
        coverImage: "https://media.istockphoto.com/id/173015527/photo/a-single-red-book-on-a-white-surface.jpg?s=612x612&w=0&k=20&c=AeKmdZvg2_bRY2Yct7odWhZXav8CgDtLMc_5_pjSItY=",
        bookPdf: pdfUrl,
        active: true
    },
    {
        _id: "126",
        bookName: "Geeta",
        bookDescription: "Geeta is the holy book",
        coverImage: "https://media.istockphoto.com/id/173015527/photo/a-single-red-book-on-a-white-surface.jpg?s=612x612&w=0&k=20&c=AeKmdZvg2_bRY2Yct7odWhZXav8CgDtLMc_5_pjSItY=",
        bookPdf: pdfUrl,
        active: false
    },
    {
        _id: "127",
        bookName: "Geeta",
        bookDescription: "Geeta is the holy book",
        coverImage: "https://media.istockphoto.com/id/173015527/photo/a-single-red-book-on-a-white-surface.jpg?s=612x612&w=0&k=20&c=AeKmdZvg2_bRY2Yct7odWhZXav8CgDtLMc_5_pjSItY=",
        bookPdf: pdfUrl,
        active: true
    },
]

export const USERLOGIN = async (formData, navigate, dispatch) => {
    // const response = await privateRequest.post('/users/adminLogin', formData);
    const response = {
        data: {
            token: "41331313131312313131313313123",
            user: {
                name: "Vijay Raj",
                role: "Admin",
                email: "vijay@gmail.com"
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

export const GETDASHBOARDCOUNTS = async () => {
    // const response = await privateRequest.get('/users/adminDashboard', {
    //     headers: {
    //         Authorization: `Bearer ${jwtToken}`,
    //     },
    // });
    const response = {
        data: {
            userCount: 16,
            bookCount: 12,
            dhyaanCount: 34
        }
    }
    return response?.data
}

export const ADDBOOK = async (formData) => {
    // const response = await privateRequest.post("/study/book", formData, {
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
    // const response = await privateRequest.get("/study/book");
    const response = {
        data: {
            success: true,
            data: books
        }
    }
    return response
}


export const UPDATEBOOK = async (formData, id) => {
    // const response = await privateRequest.put(`/study/book/${id}`,formData,{
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
    // const response = await privateRequest.delete(`/study/book/${id}`,{
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





