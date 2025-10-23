import React, { useContext, useEffect, useRef, useState } from "react";
import "../chat/chat.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequests from "../../lib/apiRequests";
import { format } from "timeago.js";
import { SocketContext } from "../../context/SocketContext";
import { useNotificationStore } from "../../lib/notificationStore";

const Chat = ({ chats }) => {
  const [chat, setChat] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const messagEndRef = useRef();
  const decrease = useNotificationStore((state) => state.decrease);

  useEffect(() => {
    messagEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await apiRequests.get("/chats/" + id);
      if (!res.data.seenBy.includes(currentUser._id)) {
        decrease();
      }

      setChat({ ...res.data, receiver });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const message = formData.get("text");
    if (!message) return;
    console.log(message);
    try {
      const res = await apiRequests.post("/messages/" + chat._id, { message });
      setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
      e.target.reset();
      // console.log(res.data);

      socket.emit("sendMessage", {
        receiverId: chat.receiver._id,
        data: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!socket || !chat) return;
    const read = async () => {
      try {
        await apiRequests.put("/chats/read/" + chat._id);
      } catch (error) {
        console.log(error);
      }
    };

    socket.on("getMessage", (data) => {
      if (chat._id == data.chats) {
        setChat((prev) => ({ ...prev, messages: [...prev.messages, data] }));
        read();
      }
    });
    return () => {
      socket.off("getMessage");
    };
  }, [socket, chat]);

  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        {chats?.map((chatItem) => (
          <div
            className="message"
            key={chatItem._id}
            style={{
              backgroundColor:
                chatItem.seenBy.includes(currentUser._id) ||
                chat?._id == chatItem._id
                  ? "white"
                  : "#fecd514e",
            }}
            onClick={() => handleOpenChat(chatItem._id, chatItem.receiver)}
          >
            <img src={chatItem.receiver.avatar || "/noavatar.jpg"} alt="" />
            <span>{chatItem.receiver.username}</span>
            <p>{chatItem.lastMessage}...</p>
          </div>
        ))}
      </div>
      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img src={chat.receiver.avatar || "/noavatar.jpg"} alt="" />
              {chat.receiver.username}
            </div>
            <span className="close" onClick={() => setChat(null)}>
              X
            </span>
          </div>
          <div className="center">
            {chat.messages.map((message) => {
              return (
                <div
                  className="chatMessage"
                  style={{
                    alignSelf:
                      message.user._id == currentUser._id
                        ? "flex-end"
                        : "flex-start",
                    textAlign:
                      message.user._id == currentUser._id ? "right" : "left",
                  }}
                >
                  <p>{message.text}</p>
                  <span>{format(message.createdAt)}</span>
                </div>
              );
            })}
            <div ref={messagEndRef} />
          </div>
          <form onSubmit={handleSend} className="bottom">
            <textarea name="text"></textarea>
            <button>Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chat;
