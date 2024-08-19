import { Route, Routes } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import DashBoard from "./Pages/DashBoard/DashBoard";
import Books from "./Pages/Subject/Subject";
import AddBooks from "./Pages/Subject/AddSubject";
import Login from "./Pages/Login/Login";
import PrivateRoute from "./Pages/PrivateRoute/PrivateRoute";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddDhyaan from "./Pages/Mcq/AddMcqSubject";
import Dhyaan from "./Pages/Mcq/McqSubject";
import ViewUserDetails from "./Pages/UserDetails/ViewUserDetails";
import AddUser from "./Pages/AddUser/AddUser.jsx";
import PdfViewer from "./Pages/PDFViewer/PDFViewer.jsx";
import EditDhyaan from "./Pages/Mcq/EditDhyaan.jsx";
import ForgotPassword from "./Pages/UserDetails/ForgotPassword.jsx";
import SetPriority from "./Pages/SetPriority/SetPriority.jsx";


function App() {


  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashBoard />
            </PrivateRoute>
          }
        />
        <Route
          path="/books"
          element={
            <PrivateRoute>
              <Books />
            </PrivateRoute>
          }
        />

        <Route
          path="/add-books"
          element={
            <PrivateRoute>
              <AddBooks />
            </PrivateRoute>
          }
        />
        <Route
          path="/dhyaan"
          element={
            <PrivateRoute>
              <Dhyaan />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-dhyaan"
          element={
            <PrivateRoute>
              <AddDhyaan />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-dhyaan"
          element={
            <PrivateRoute>
              <EditDhyaan />
            </PrivateRoute>
          }
        />

        <Route
          path="/users"
          element={
            <PrivateRoute>
              <AddUser />
            </PrivateRoute>
          }
        />
        <Route
          path="/view-userDetails"
          element={
            <PrivateRoute>
              <ViewUserDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/priority"
          element={
            <PrivateRoute>
              <SetPriority />
            </PrivateRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/view-pdf" element={<PdfViewer />} />
      </Routes>
      <ToastContainer />

    </>

  );
}

export default App;