import { toast } from "react-toastify";
import { privateRequest } from "./configs/RequestMethod";
import Cookies from 'js-cookie';
import { changeUserData, login, logout } from "./features/auth-slice";


export const loginPageImg = "https://pngfre.com/wp-content/uploads/hanuman-36-281x300.png"
const pdfUrl = "https://www.hindutemplealbany.org/wp-content/uploads/2016/08/Sri_Hanuman_Chalisa_Hindi.pdf"
const dhyaanPoster = "https://cdn.exoticindia.com/images/products/original/books/gpa229.jpg"
const coverImage = "https://m.media-amazon.com/images/I/715smRhK8JL._AC_UF1000,1000_QL80_.jpg"

export const brandImg = "https://w7.pngwing.com/pngs/898/783/png-transparent-om-namaste-hinduism-symbol-yoga-hindu-gods-text-trademark-logo.png"


export const USERLOGIN = async (formData, navigate, dispatch) => {
    const response = await privateRequest.post('/login', formData);
    dispatch(login(response?.data));
    const { token } = response.data;
    Cookies.set('jwtToken', token);
    toast.success(response.data.message)
    navigate('/')
}

export const USERLOGOUT = (navigate, dispatch) => {
    dispatch(logout());
    Cookies.remove('jwtToken');
    toast.success('Logged Out Successfully');
    navigate("/login");
}

export const UPDATEADMINDETAILS = async (formData, dispatch) => {
    const jwtToken = Cookies.get('jwtToken');
    const response = await privateRequest.put('/profile', formData, {
        headers: {
            Authorization: `Bearer ${jwtToken}`,
        }
    });
    dispatch(login(response?.data));
    toast.success(response.data.message)
}

export const GETPROFILE = async () => {
    const jwtToken = Cookies.get('jwtToken');
    const response = await privateRequest.get('/profile', {
        headers: {
            Authorization: `Bearer ${jwtToken}`,
        }
    });
    return response
}

export const CHANGEPASSWORD = async (formData, navigate, dispatch) => {
    const jwtToken = Cookies.get('jwtToken');
    console.log("jwtToken", jwtToken)
    const response = await privateRequest.put('/change_password', formData, {
        headers: {
            Authorization: `Bearer ${jwtToken}`,
        },
    });
    dispatch(logout(response?.data));
    toast.success(response.data.message)
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
}

export const GETDASHBOARDDATA = async () => {
    const jwtToken = Cookies.get('jwtToken');
    const response = await privateRequest.get('/dashboard', {
        headers: {
            Authorization: `Bearer ${jwtToken}`,
        },
    });
    return response
}

export const ADDBOOK = async (formData) => {
    const jwtToken = Cookies.get('jwtToken');
    const response = await privateRequest.post("/book", formData, {
        headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'multipart/form-data'
        }
    });
    return response
}

export const GETBOOKS = async (searchTerm = "", page = 1, limit = 10) => {
    const jwtToken = Cookies.get('jwtToken');
    const response = await privateRequest.get(`/all_books`, {
        headers: {
            Authorization: `Bearer ${jwtToken}`,
        },
        params: {
            search: searchTerm,
            page: page,
            limit: limit,
        },
    });
    return response
}


export const UPDATEBOOK = async (id, formData) => {
    const jwtToken = Cookies.get('jwtToken');
    const response = await privateRequest.put(`/book/${id}`, formData, {
        headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'multipart/form-data'
        }
    });
    return response
}

export const DELETEBOOK = async (id) => {
    const jwtToken = Cookies.get('jwtToken');
    const response = await privateRequest.delete(`/book/${id}`, {
        headers: {
            Authorization: `Bearer ${jwtToken}`,
        }
    });
    return response
}

export const ADDDHYAAN = async (formData) => {
    const jwtToken = Cookies.get('jwtToken');
    const response = await privateRequest.post("/dhyaan", formData, {
        headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'multipart/form-data'
        }
    });
    return response
}

export const GETDHYAAN = async (searchTerm = "", page = 1, limit = 10) => {
    const jwtToken = Cookies.get('jwtToken');
    const response = await privateRequest.get("/all_dhyaans", {
        headers: {
            Authorization: `Bearer ${jwtToken}`,
        },
        params: {
            search: searchTerm,
            page: page,
            limit: limit,
        },
    });
    return response
}

export const UPDATEDHYAAN = async (id, formData) => {
    const jwtToken = Cookies.get('jwtToken');
    const response = await privateRequest.put(`/dhyaan/${id}`, formData, {
        headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'multipart/form-data'
        }
    });
    return response
}

export const DELETEDHYAAN = async (id) => {
    const jwtToken = Cookies.get('jwtToken');
    const response = await privateRequest.delete(`/dhyaan/${id}`, {
        headers: {
            Authorization: `Bearer ${jwtToken}`,
        }
    });
    return response
}

export const GETUSERS = async (page, limit) => {
    const jwtToken = Cookies.get('jwtToken');
    const response = await privateRequest.get(`/getAllUsers/`, {
        headers: {
            Authorization: `Bearer ${jwtToken}`,
        },
        params: {
            page: page,
            limit: limit,
        },
    });
    return response
}

export const FORGOTPASSWORD = async (formData) => {

    const response = await privateRequest.post("/forget_password", formData);
    return response
}

export const VERIFYOTP = async (formData) => {
    const response = await privateRequest.post("/verify_otp", formData);
    return response
}

export const RESETPASSWORD = async (formData, navigate) => {
    const response = await privateRequest.post("/reset_password", formData);
    navigate("/login")
    return response
}

export const SETPRIORITY = async (formData) => {
    const jwtToken = Cookies.get('jwtToken');
    const response = await privateRequest.post("/set_priority", formData, {
        headers: {
            Authorization: `Bearer ${jwtToken}`,
        },
    });
    return response
}

export const REMOVEPRIORITY = async (id) => {
    const jwtToken = Cookies.get('jwtToken');
    const response = await privateRequest.delete(`/remove/${id}`, formData, {
        headers: {
            Authorization: `Bearer ${jwtToken}`,
        },
    });
    return response
}

export const GETPRIORITY = async (type = "Books") => {
    const jwtToken = Cookies.get('jwtToken');
    const response = await privateRequest.post("/priority_books", { type }, {
        headers: {
            Authorization: `Bearer ${jwtToken}`,
        },
    });
    return response
}





