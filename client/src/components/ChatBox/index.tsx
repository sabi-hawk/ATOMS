import React, { useEffect, useState } from "react";
import { getMessages } from "../../api/conversation";
import { getUser } from "../../api/user";
import { prettifyName } from "../../hooks/formating";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";

const ChatBox = ({ chat, currentUser }: any) => {
  const [userData, setUserData] = useState<any>(null);
  const [messages, setMessages] = useState<any>([]);
  const [newMessage, setNewMessage] = useState<any>("");

  //   fetching data for header
  useEffect(() => {
    const userId = chat?.members?.find((id: string) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
        console.log("found user", data);
      } catch (error) {
        console.log("Error | Chat | ChatBox | getUserData", error);
      }
    };
    if (chat !== null) getUserData();
  }, [chat, currentUser]);
  //   fetching data for messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
        console.log("Found Messages");
      } catch (error) {
        console.log("Error | Chat | ChatBox | getMessages", error);
      }
    };
    if (chat !== null) fetchMessages();
  }, [chat]);
  const handleChange = (newMessage: string) => {
    setNewMessage(newMessage);
  };
  const handleSend = () => {};
  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            <div className="chat-header">
              <div className="follower">
                <div className="chat-card-container">
                  <img
                    src={
                      userData?.profilePicture
                        ? process.env.REACT_APP_PUBLIC_FOLDER +
                          userData?.profilePicture
                        : process.env.REACT_APP_PUBLIC_FOLDER +
                          "defaultProfile.png"
                    }
                    alt=""
                    className="followerImage"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div className="name" style={{ fontSize: "0.8rem" }}>
                    <span className="name-span">
                      {prettifyName(userData?.name?.first)}{" "}
                      {prettifyName(userData?.name?.last)}
                    </span>
                  </div>
                </div>
              </div>
              <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
            </div>
            {/* ChatBox Messages */}
            <div className="chat-body">
              {messages.map((message: any) => (
                <>
                  <div
                    className={
                      message.senderId === currentUser
                        ? "message own"
                        : "message"
                    }
                  >
                    <span>{message.text}</span>
                    <span>{format(message.createdAt)}</span>
                  </div>
                </>
              ))}
            </div>
            {/* chat-sender */}
            <div className="chat-sender">
              <div>+</div>
              <InputEmoji value={newMessage} onChange={handleChange} />
              <div className="send-button button" onClick={handleSend}>
                Send
              </div>
            </div>
          </>
        ) : (
          <span className="chatbox-empty-message">Tap on a Chat to start Conversation...</span>
        )}
      </div>
    </>
  );
};

export default ChatBox;
