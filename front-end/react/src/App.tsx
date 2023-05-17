import { BrowserRouter, Route, Routes } from "react-router-dom";

import AuthContextProvider from "./contexts/authContext";
import AccContextProvider from "./contexts/accContext";
import NotFound from "./components/pages/NotFound404/NotFound";
import TasksiteContextProvider from "./contexts/tasksiteContext";
import Post from "./components/pages/Post/Post";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import Login from "./components/pages/Login/Login";
import Register from "./components/pages/register/Register";

const App = () => {
  return (
    <AuthContextProvider>
      <AccContextProvider>
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
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* <Route path="/signup" element={<NewAccount />} />   */}
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
        </TasksiteContextProvider>
      </AccContextProvider>
    </AuthContextProvider>
  );
};

export default App;
