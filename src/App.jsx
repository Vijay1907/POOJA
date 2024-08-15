import { Route, Routes } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Lecture from "./Pages/Lectures/Lectures"
import DashBoard from "./Pages/DashBoard/DashBoard";
import AddLecture from "./Pages/Lectures/AddLecture";
import Books from "./Pages/Subject/Subject";
import AddBooks from "./Pages/Subject/AddSubject";
import AddTopic from "./Pages/Topic/AddTopic";
import Topic from "./Pages/Topic/Topic";
import Login from "./Pages/Login/Login";
import ValidateOtp from "./Pages/Login/ValidateOtp";
import PrivateRoute from "./Pages/PrivateRoute/PrivateRoute";
import UpdateSubject from "./Pages/Subject/UpdateSubject";
// import {ReactQueryDevTools} from "react-query/devtools"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddDhyaan from "./Pages/Mcq/AddMcqSubject";
import Dhyaan from "./Pages/Mcq/McqSubject";
import AddMcq from "./Pages/Mcq/AddMcq";
import AddMcqTest from "./Pages/Mcq/AddMcqTest";
import ViewUserDetails from "./Pages/UserDetails/ViewUserDetails";
import ContactUs from "./Pages/ContactUs/ContactUs";
import UpdateMcqSubject from "./Pages/Mcq/UpdateMcqSubject";
import UpdateTopic from "./Pages/Topic/UpdateTopic";
import AboutUs from "./Pages/AboutUs/AboutUs";
import UpdateAbout from "./Pages/AboutUs/UpdateAbout";
import AddUser from "./Pages/AddUser/AddUser.jsx";
import AddAbout from "./Pages/AboutUs/AddAbout";
import PdfViewer from "./Pages/PDFViewer/PDFViewer.jsx";


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
          path="/users"
          element={
            <PrivateRoute>
              <AddUser />
            </PrivateRoute>
          }
        />
        <Route
          path="/view-userDetails/:id"
          element={
            <PrivateRoute>
              <ViewUserDetails />
            </PrivateRoute>
          }
        />

        <Route
          path="/update-subject/:id"
          element={
            <PrivateRoute>
              <UpdateSubject />
            </PrivateRoute>
          }
        />
        <Route
          path="/update-Mcqsubject/:id"
          element={
            <PrivateRoute>
              <UpdateMcqSubject />
            </PrivateRoute>
          }
        />
        <Route
          path="/topic/:id"
          element={
            <PrivateRoute>
              <Topic />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-topic/:id"
          element={
            <PrivateRoute>
              <AddTopic />
            </PrivateRoute>
          }
        />
        <Route
          path="/update-topic/:id"
          element={
            <PrivateRoute>
              <UpdateTopic />
            </PrivateRoute>
          }
        />
        <Route
          path="/lecture"
          element={
            <PrivateRoute>
              <Lecture />
            </PrivateRoute>
          }
        /><Route
          path="/add-lecture"
          element={
            <PrivateRoute>
              <AddLecture />
            </PrivateRoute>
          }
        />

        <Route
          path="/add-mcq/:id"
          element={
            <PrivateRoute>
              <AddMcq />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-mcqTest/:id"
          element={
            <PrivateRoute>
              <AddMcqTest />
            </PrivateRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <PrivateRoute>
              <ContactUs />
            </PrivateRoute>
          }
        />
        <Route
          path="/about"
          element={
            <PrivateRoute>
              <AboutUs />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-about"
          element={
            <PrivateRoute>
              <AddAbout />
            </PrivateRoute>
          }
        />
        <Route
          path="/update-about/:id"
          element={
            <PrivateRoute>
              <UpdateAbout />
            </PrivateRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/otp-validate" element={<ValidateOtp />} />
        <Route path="/view-pdf" element={<PdfViewer />} />
      </Routes>
      <ToastContainer />

    </>

  );
}

export default App;