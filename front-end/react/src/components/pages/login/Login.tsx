import "./login.scss";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/authContext";
import { Navigate } from "react-router-dom";
import LoginForm from "./LoginForm";

const Login: React.FC = () => {
  //
  // const navigate = useNavigate();
  const {
    authState: { isAuthenticated },
  } = useContext(AuthContext);

  if (isAuthenticated) {
    return <Navigate to="/post" />;
  }

  return <LoginForm />;
};

export default Login;
