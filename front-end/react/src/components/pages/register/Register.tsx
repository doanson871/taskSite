import React, { useContext, useState } from "react";
import { AccContext } from "../../../contexts/accContext";
import { useNavigate } from "react-router";

const initialDistrict = [
  "Chọn quận huyện",
  "hà đông",
  "ba đình",
  "đống đa",
  "cầu giấy",
];
export interface RegisterForm {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  district: string;
  role: string;
}

const initialRole = ["người tìm việc", "người tuyển dụng"];

const Register: React.FC = () => {
  const [registerForm, setRegisterForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    repassword: "",
    district: "",
    role: "người tìm việc",
  });
  const navigate = useNavigate();

  const { createNewAccount } = useContext(AccContext);

  const handleRegister = async (e: any) => {
    e.preventDefault();
    if (registerForm.password !== registerForm.repassword) {
      setRegisterForm({ ...registerForm, repassword: "", password: "" });
      alert("Mật khẩu không trùng khớp");
      return;
    } else {
      const accountForm: RegisterForm = {
        firstname: registerForm.firstname,
        lastname: registerForm.lastname,
        email: registerForm.email,
        password: registerForm.password,
        district: registerForm.district,
        role: registerForm.role,
      };

      try {
        const accountData = await createNewAccount(accountForm);
        console.log(accountData);
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
  return (
    <form className="row g-3" onSubmit={handleRegister}>
      <div className="col-md-6">
        <label htmlFor="inputFirstname4" className="form-label">
          Họ
        </label>
        <input
          type="text"
          className="form-control"
          id="inputFirstname4"
          value={registerForm.firstname}
          onChange={(e) =>
            setRegisterForm({ ...registerForm, firstname: e.target.value })
          }
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="inputLastname4" className="form-label">
          Tên đệm và tên
        </label>
        <input
          type="text"
          className="form-control"
          id="inputLastname4"
          value={registerForm.lastname}
          onChange={(e) =>
            setRegisterForm({ ...registerForm, lastname: e.target.value })
          }
        />
      </div>
      <div className="col-12">
        <label htmlFor="inputEmail" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="inputEmail"
          placeholder="Nhập email"
          value={registerForm.email}
          onChange={(e) =>
            setRegisterForm({ ...registerForm, email: e.target.value })
          }
        />
      </div>
      <div className="col-12">
        <label htmlFor="inputPassword2" className="form-label">
          Mật khẩu
        </label>
        <input
          type="password"
          className="form-control"
          id="inputPassword2"
          value={registerForm.password}
          onChange={(e) =>
            setRegisterForm({ ...registerForm, password: e.target.value })
          }
        />
      </div>
      <div className="col-12">
        <label htmlFor="inputPassword4" className="form-label">
          Nhập lại mật khẩu
        </label>
        <input
          type="password"
          className="form-control"
          id="inputPassword4"
          value={registerForm.repassword}
          onChange={(e) => {
            setRegisterForm({ ...registerForm, repassword: e.target.value });
          }}
        />
      </div>
      <div className="col-md-4">
        <label htmlFor="inputState" className="form-label">
          Địa chỉ
        </label>
        <select
          id="inputState"
          className="form-select"
          onChange={(e) => {
            setRegisterForm({ ...registerForm, district: e.target.value });
          }}
        >
          {initialDistrict.map((district) => (
            <option key={district}>{district}</option>
          ))}
        </select>
      </div>
      <div className="col-md-4">
        <label htmlFor="inputRole" className="form-label">
          Chọn quyền
        </label>
        <select
          id="inputRole"
          className="form-select"
          onChange={(e) => {
            setRegisterForm({ ...registerForm, role: e.target.value });
          }}
        >
          {initialRole.map((role) => (
            <option key={role}>{role}</option>
          ))}
        </select>
      </div>
      <div className="col-12">
        <button type="submit" className="btn btn-primary">
          Sign in
        </button>
      </div>
    </form>
  );
};

export default Register;
