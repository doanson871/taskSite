// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/authContext";

import "./login.scss";

const LoginForm = () => {
  // state login and auth context
  const { loginUser } = useContext(AuthContext);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  // handle login

  const login = async (event: any) => {
    event.preventDefault();
    try {
      console.log(loginForm);
      // eslint-disable-next-line
      const loginData = await loginUser(loginForm);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={login}>
      <div className="form-outline mb-4">
        <input
          type="email"
          value={loginForm.email}
          name="email"
          onChange={(e) =>
            setLoginForm({ ...loginForm, email: e.target.value })
          }
        />
        <label className="form-label" htmlFor="form2Example1">
          Email address
        </label>
      </div>

      <div className="form-outline mb-4">
        <input
          type="password"
          value={loginForm.password}
          name="email"
          onChange={(e) =>
            setLoginForm({ ...loginForm, password: e.target.value })
          }
        />
        <label className="form-label" htmlFor="form2Example2">
          Password
        </label>
      </div>

      <input type="submit" value="Submit" />
    </form>
  );
};

export default LoginForm;
