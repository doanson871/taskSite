import { BrowserRouter, Route, Routes } from "react-router-dom";

import AuthContextProvider from "./contexts/authContext";
import AccContextProvider from "./contexts/accContext";
import NotFound from "./components/pages/NotFound404/NotFound";
import TasksiteContextProvider from "./contexts/tasksiteContext";
import Post from "./components/pages/Post/Post";
<<<<<<< HEAD
import Login from "./components/pages/Login/LoginPage";
import Register from "./components/pages/Login/RegisterPage"
=======
import Login from "./components/pages/login/LoginPage";
import Register from "/components/pages/login/RegisterPage";
import ProtectedRoute from "./components/routing/ProtectedRoute";
>>>>>>> f1863fa8a4870a53eab3186dbe4b4f748b9c8660

const App = () => {
  return (
    <AuthContextProvider>
      <AccContextProvider>
<<<<<<< HEAD
        <TasksiteContextProvider element={{
          showNavbar: false,
          setShowNavbar: function (c: boolean): void {
            throw new Error("Function not implemented.");
          }
        }} >
          <Router>
            <div className="container">
              <Routes>
                <Route exact path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register/>}/>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </Router>
=======
        <TasksiteContextProvider
          element={{
            showNavbar: false,
            setShowNavbar: function (c: boolean): void {
              throw new Error("Function not implemented.");
            },
          }}
        >
          <BrowserRouter>
            <Routes>
              {/* <Route path="/" element={<Login />} />  */}
              <Route path="/login" element={<Login />} />
              {/* <Route path="/register" element={<Register />} />   */}
              <Route path="/" element={<ProtectedRoute />}>
                <Route path="/post" element={<Post />} />
                <Route path="/joblist" element={<Post />} />
                <Route path="/message" element={<Post />} />
                <Route path="/notify" element={<Post />} />
                <Route path="/profile" element={<Post />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
>>>>>>> f1863fa8a4870a53eab3186dbe4b4f748b9c8660
        </TasksiteContextProvider>
      </AccContextProvider>
    </AuthContextProvider>
  );
};

export default App;
