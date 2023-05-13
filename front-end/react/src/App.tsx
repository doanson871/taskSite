import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthContextProvider from "./contexts/authContext";
import AccContextProvider from "./contexts/accContext";
import NotFound from "./components/pages/NotFound404/NotFound";
import TasksiteContextProvider from "./contexts/tasksiteContext";
import Navbar from "./components/navbar/Navbar";
import Post from "./components/pages/Post/Post";

function App() {
  return (
    <AuthContextProvider>
      <AccContextProvider>
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
                <Route exact path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </Router>
        </TasksiteContextProvider>
      </AccContextProvider>
    </AuthContextProvider>
  );
}

export default App;
