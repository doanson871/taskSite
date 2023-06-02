// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/authContext";

import "./login.scss";
import { Link } from "react-router-dom";

const LoginForm: React.FC = () => {
  // state login and auth context
  const { loginUser } = useContext(AuthContext);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [isVisible, setIsVisible] = useState(false);

  // handle login

  const login = async (event: any) => {
    event.preventDefault();
    try {
      const loginData = await loginUser(loginForm);
      if (loginData.statusCode === 403) {
        alert("Sai tên đăng nhập hoặc mật khẩu");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggle = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="login-container d-flex">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center mb-5">
            <h1 className="heading-section">Đăng nhập</h1>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="login-wrap p-0">
              <form action="#" className="signin-form" onSubmit={login}>
                <div className="form-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    required
                    value={loginForm.email}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, email: e.target.value })
                    }
                  />
                </div>
                <div className="form-group mb-3 mb-3 position-relative">
                  <input
                    type={!isVisible ? "password" : "text"}
                    required
                    id="password-field"
                    className="form-control"
                    placeholder="Password"
                    value={loginForm.password}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, password: e.target.value })
                    }
                  />
                  <span className="eye-icon" onClick={toggle}>
                    {isVisible ? (
                      <i className="bi bi-eye"></i>
                    ) : (
                      <i className="bi bi-eye-slash"></i>
                    )}
                  </span>
                </div>
                <div className="form-group mb-3 mb-3">
                  <button
                    type="submit"
                    className="form-control btn btn-primary submit px-3"
                  >
                    Đăng nhập
                  </button>
                </div>
                <div className="form-group mb-3 d-flex register-form">
                  <Link to="/register" className="register">
                    Đăng ký tài khoản
                  </Link>
                  <span className="checkbox-wrap checkbox-primary">
                    Bạn chưa có tài khoản?
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
