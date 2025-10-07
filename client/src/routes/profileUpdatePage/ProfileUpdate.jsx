import React, { useContext, useState } from "react";
import "./profileUpdate.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequests from "../../lib/apiRequests";
import { useNavigate } from "react-router-dom";
import UploadWidget from "../../components/uploadWidget/uploadWidget";

const ProfileUpdate = () => {
  const [error, setError] = useState("");
  const { currentUser, updateUser } = useContext(AuthContext);
  const [avatar,setAvatar] = useState([])
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);
    const data = {
      username,
      email,
      password,
      avatar:avatar[0]
    };

    try {
      const res = await apiRequests.put(`/users/${currentUser._id}`, data);
      updateUser(res.data);
      navigate("/profile");
    } catch (error) {
      console.log(error);

      setError(error.response.data.message);
    }
  };
  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button>Update</button>
          {error && <span>{error}</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img
          src={avatar[0] || currentUser.avatar || "/noavatar.jpg"}
          alt=""
          className="avatar"
        />
        <UploadWidget
          uwConfig={{
            cloudName: "dxlhyqmj9",
            uploadPreset:"estate",
            multiple:false,
            maxImageFileSize:2000000,
            folder:"avatars",           
          }}
          setState={setAvatar}
        />
      </div>
    </div>
  );
};

export default ProfileUpdate;
