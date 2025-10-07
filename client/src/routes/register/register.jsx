import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import { useState } from "react";
import apiRequests from "../../lib/apiRequests";

const Register = () => {
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      console.log(username, email, password);

      const res = await apiRequests.post("/auth/register", {
        username,
        email,
        password,
      });

      navigate("/login");
    } catch (error) {
      console.log(error.response.data.message);
      setError(error.response.data.message);
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="registerPage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button disabled={isLoading}>Register</button>
          {error && <span>{error} </span>}
          <Link to="/">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
};

export default Register;
