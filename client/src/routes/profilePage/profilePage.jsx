import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import apiRequests from "../../lib/apiRequests";
import "./profilePage.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Suspense } from "react";

function profilePage() {
  const navigate = useNavigate();
  const { updateUser, currentUser } = useContext(AuthContext);
  const data = useLoaderData();
  const handleLogout = async () => {
    try {
      const res = await apiRequests.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (error) {
      console.error();
    }
  };
  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
              <button>Updates Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img src={currentUser.avatar || "/noavatar.jpg"} alt="" />
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>E-mail: {currentUser.email}</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to={"/addpost"}>
              <button>Create New Post</button>
            </Link>
          </div>
          <Suspense fallback={<h>Loading...</h>}>
            <Await
              resolve={data.userResponse}
              errorElement={<p>Error loading Posts!</p>}
            >
              {(userResponse) => <List posts={userResponse.data.userPosts} />}
            </Await>
          </Suspense>
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <Suspense fallback={<h>Loading...</h>}>
            <Await
              resolve={data.userResponse}
              errorElement={<p>Error loading Posts!</p>}
            >
              {(userResponse) => <List posts={userResponse.data.savedPost} />}
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default profilePage;
