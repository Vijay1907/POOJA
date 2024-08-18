// import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
const PrivateRoute = ({ children }) => {
  // const { isAuthenticated } = useSelector((state) => state.auth);
  const  isAuthenticated  = localStorage.getItem('isAuthenticated')
  // const  isAuthenticated  = true
  console.log(isAuthenticated)
  if (!isAuthenticated) {
    return (
      <>
        <Navigate to="/login" />
      </>
    ); 
  }  else  {
      return children;
    } 
  }

export default PrivateRoute;