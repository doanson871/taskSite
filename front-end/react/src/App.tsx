import { BrowserRouter, Route, Routes } from "react-router-dom";

import AuthContextProvider from "./contexts/authContext";
import AccContextProvider from "./contexts/accContext";
import NotFound from "./components/pages/NotFound404/NotFound";
import TasksiteContextProvider from "./contexts/tasksiteContext";
import Post from "./components/pages/Post/Post";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import Register from "./components/pages/register/Register";
import ChatContextProvider from "./contexts/chatContext";
import Profile from "./components/pages/profile/Profile";
import NotiContextProvider from "./contexts/notiContext";
import Chat from "./components/pages/Chat/chat";
import PostDetails from "./components/mini-component/post-detail/PostDetails";
import EmployeePost from "./components/pages/employee-post/EmployeePost";
import History from "./components/pages/history/History";
import Analysis from "./components/pages/analysis/Analysis";
import AvailableWorks from "./components/pages/available-works/AvailableWorks";
import Login from "./components/pages/Login/Login";

const App = () => {
  return (
    <AuthContextProvider>
      <AccContextProvider>
        <TasksiteContextProvider>
          <ChatContextProvider>
            <NotiContextProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  {/* <Route path="/signup" element={<NewAccount />} />   */}
                  <Route path="/" element={<ProtectedRoute />}>
                    <Route path="/post" element={<Post />} />
                    <Route path="/listPost" element={<Post />} />
                    <Route path="/post/:idPost" element={<PostDetails />} />
                    <Route path="/message" element={<Chat />}>
                      <Route path=":idChat" element={<Chat />} />
                    </Route>
                    <Route path="/history" element={<History />} />
                    <Route path="/analysis" element={<Analysis />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/profile/:idProfile" element={<Profile />} />
                    <Route path="/employee/post" element={<EmployeePost />} />
                    <Route
                      path="/availableWorks"
                      element={<AvailableWorks />}
                    />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </NotiContextProvider>
          </ChatContextProvider>
        </TasksiteContextProvider>
      </AccContextProvider>
    </AuthContextProvider>
  );
};

export default App;
