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
import ApplyModel from "./components/model/ApplyModel";
import Chat from "./components/pages/Chat/chat";
import Login from "./components/pages/login/Login";

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
                    <Route path="/joblist" element={<Post />} />
                    <Route path="/message" element={<Chat />}>
                      <Route path=":idChat" element={<Chat />} />
                    </Route>
                    <Route path="/notify" element={<Post />} />
                    <Route path="/profile" element={<Profile />} />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <ApplyModel />
              </BrowserRouter>
            </NotiContextProvider>
          </ChatContextProvider>
        </TasksiteContextProvider>
      </AccContextProvider>
    </AuthContextProvider>
  );
};

export default App;
