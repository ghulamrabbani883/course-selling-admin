import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateCourse from "./components/CreateCourse";
import ShowCourse from "./components/ShowCourse";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import UpdateCourse from "./components/UpdateCourse";
import SecureRoute from "./SecureRoute";
import Error404 from "./components/Error404";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/about"
          element={
            <SecureRoute>
              <CreateCourse />
            </SecureRoute>
          }
        />
        <Route
          path="/courses"
          element={
            <SecureRoute>
              <ShowCourse />
            </SecureRoute>
          }
        />
        <Route
          path="/courses/:courseId"
          element={
            <SecureRoute>
              <UpdateCourse />
            </SecureRoute>
          }
        />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
