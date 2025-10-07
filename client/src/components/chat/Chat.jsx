import React, { useState } from "react";
import "../chat/chat.scss";

const Chat = () => {
    const [chat,setChat]= useState(true);
  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        <div className="message">
          <img
            src="https://static.independent.co.uk/2021/08/27/13/newFile-5.jpg"
            alt=""
          />
          <span>AGW</span>
          <p>It is a long established fact that a reader ...</p>
        </div>
        <div className="message">
          <img
            src="https://static.independent.co.uk/2021/08/27/13/newFile-5.jpg"
            alt=""
          />
          <span>AGW</span>
          <p>It is a long established fact that a reader ...</p>
        </div>
        <div className="message">
          <img
            src="https://static.independent.co.uk/2021/08/27/13/newFile-5.jpg"
            alt=""
          />
          <span>AGW</span>
          <p>It is a long established fact that a reader ...</p>
        </div>
        <div className="message">
          <img
            src="https://static.independent.co.uk/2021/08/27/13/newFile-5.jpg"
            alt=""
          />
          <span>AGW</span>
          <p>It is a long established fact that a reader ...</p>
        </div>
        <div className="message">
          <img
            src="https://static.independent.co.uk/2021/08/27/13/newFile-5.jpg"
            alt=""
          />
          <span>AGW</span>
          <p>It is a long established fact that a reader ...</p>
        </div>
        <div className="message">
          <img
            src="https://static.independent.co.uk/2021/08/27/13/newFile-5.jpg"
            alt=""
          />
          <span>AGW</span>
          <p>It is a long established fact that a reader ...</p>
        </div>
        <div className="message">
          <img
            src="https://static.independent.co.uk/2021/08/27/13/newFile-5.jpg"
            alt=""
          />
          <span>AGW</span>
          <p>It is a long established fact that a reader ...</p>
        </div>
      </div>
      {chat && (<div className="chatBox">
        <div className="top">
          <div className="user">
            <img
              src="https://static.independent.co.uk/2021/08/27/13/newFile-5.jpg"
              alt=""
            />
            AGW
          </div>
          <span className="close" onClick={()=>setChat(null)}>X</span>
        </div>
        <div className="center">
          <div className="chatMessage own">
            <p>long established fact that a reader ...</p>
            <span>1 Hour ago</span>
          </div>
          <div className="chatMessage">
            <p>long established fact that a reader ...</p>
            <span>1 Hour ago</span>
          </div>
          <div className="chatMessage own">
            <p>long established fact that a reader ...</p>
            <span>1 Hour ago</span>
          </div>
          <div className="chatMessage">
            <p>long established fact that a reader ...</p>
            <span>1 Hour ago</span>
          </div>
          <div className="chatMessage own">
            <p>long established fact that a reader ...</p>
            <span>1 Hour ago</span>
          </div>
          <div className="chatMessage">
            <p>long established fact that a reader ...</p>
            <span>1 Hour ago</span>
          </div>
        </div>
        <div className="bottom">
            <textarea></textarea>
            <button>Send</button>
        </div>
      </div>)}
    </div>
  );
};

export default Chat;
