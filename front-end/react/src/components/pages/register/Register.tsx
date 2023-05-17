import React, { useContext, useState } from "react";
import { AccContext } from "../../../contexts/accContext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "./register.scss";
export interface RegisterForm {
  fullname: string;
  email: string;
  password: string;
  role: string;
}

const initialRole = ["Người tìm việc", "Người tuyển dụng"];

const Register: React.FC = () => {
  const [registerForm, setRegisterForm] = useState({
    fullname: "",
    email: "",
    password: "",
    repassword: "",
    role: "người tìm việc",
  });
  const navigate = useNavigate();

  const { createNewAccount } = useContext(AccContext);
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isVisibleRePassword, setIsVisibleRePassword] = useState(false);

  const handleRegister = async (e: any) => {
    e.preventDefault();
    if (registerForm.password !== registerForm.repassword) {
      setRegisterForm({ ...registerForm, repassword: "", password: "" });
      alert("Mật khẩu không trùng khớp");
      return;
    } else {
      const accountForm: RegisterForm = {
        fullname: registerForm.fullname,
        email: registerForm.email,
        password: registerForm.password,
        role: registerForm.role,
      };

      try {
        const accountData = await createNewAccount(accountForm);
        if (accountData.status === 201) {
          navigate("/login");
        } else {
          console.log("fail \n");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const togglePassword = () => {
    setIsVisiblePassword(!isVisiblePassword);
  };
  const toggleRePassword = () => {
    setIsVisibleRePassword(!isVisibleRePassword);
  };
  return (
    <div className="register-container d-flex">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center mb-5">
            <h1 className="heading-section">Đăng ký tài khoản</h1>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="login-wrap p-0">
              <form
                action="#"
                className="signin-form"
                onSubmit={handleRegister}
              >
                <div className="form-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Họ và tên"
                    required
                    value={registerForm.fullname}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        fullname: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    required
                    value={registerForm.email}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group mb-3 mb-3 position-relative">
                  <input
                    type={!isVisiblePassword ? "password" : "text"}
                    required
                    id="password-field1"
                    className="form-control"
                    placeholder="Mật khẩu"
                    value={registerForm.password}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        password: e.target.value,
                      })
                    }
                  />
                  <span className="eye-icon" onClick={togglePassword}>
                    {isVisiblePassword ? (
                      <i className="bi bi-eye"></i>
                    ) : (
                      <i className="bi bi-eye-slash"></i>
                    )}
                  </span>
                </div>
                <div className="form-group mb-3 mb-3 position-relative">
                  <input
                    type={!isVisibleRePassword ? "password" : "text"}
                    required
                    id="password-field"
                    className="form-control"
                    placeholder="Nhập lại mật khẩu"
                    value={registerForm.repassword}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        repassword: e.target.value,
                      })
                    }
                  />
                  <span className="eye-icon" onClick={toggleRePassword}>
                    {isVisibleRePassword ? (
                      <i className="bi bi-eye"></i>
                    ) : (
                      <i className="bi bi-eye-slash"></i>
                    )}
                  </span>
                </div>
                <div className="form-group mb-3 mb-3 d-flex role-select">
                  {initialRole.map((role, index) => (
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id={`flexRadioDefault-${index}`}
                        onClick={(e) => {
                          setRegisterForm({
                            ...registerForm,
                            role: initialRole[index],
                          });
                        }}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`flexRadioDefault${index}`}
                      >
                        {role}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="form-group mb-3 mb-3">
                  <button
                    type="submit"
                    className="form-control btn btn-primary submit px-3"
                  >
                    Tạo tài khoản
                  </button>
                </div>
                <div className="form-group mb-3 d-flex login-form">
                  <Link to="/" className="login">
                    Đăng nhập
                  </Link>
                  <span className="checkbox-wrap checkbox-primary">
                    Bạn đã có tài khoản?
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

export default Register;
