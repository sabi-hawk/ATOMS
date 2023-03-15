import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import { getMessages, sendMessage } from "../../api/conversation";
import { getUser } from "../../api/user";
import { prettifyName } from "../../hooks/formating";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import { useSelector } from "react-redux";
import user from "../../flux/reducers/auth";
import { AtomState } from "../../flux/store";
import whatsAppImg from "../../images/chat-background.png";
import logo from "../../images/logo.svg"

const ChatBox = ({
  chat, // there was also currentUser
  setSendMessage,
  receiveMessage,
}: any) => {

  const currentUser = useSelector((state: AtomState) => state?.auth.user?._id);
  const [userData, setUserData] = useState<any>(null);
  const [messages, setMessages] = useState<any>([]);
  const [newMessage, setNewMessage] = useState<any>("");
  const user = useSelector((state: AtomState) => state?.auth?.user);
  const scroll = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // also added && receiveMessage.chatId === chat._id
    if (receiveMessage !== null) {
      console.log("Data received in Child ChatBox");
      setMessages([...messages, receiveMessage]);
    }
  }, [receiveMessage]);
  //   fetching data for header
  useEffect(() => {
    const userId = chat?.members?.find((id: string) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId, user.token);
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
        const { data } = await getMessages(chat._id, user.token);
        setMessages(data);
        console.log("Found Messages", data);
      } catch (error) {
        console.log("Error | Chat | ChatBox | getMessages", error);
      }
    };
    if (chat !== null) fetchMessages();
  }, [chat]);
  const handleChange = (newMessage: string) => {
    setNewMessage(newMessage);
  };
  const handleSend = async (e: any) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessage,
    };

    //send message to database
    try {
      const { data } = await sendMessage(chat._id, message, user.token);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }

    // send message to socket server
    const receiverId = chat?.members.find((id: string) => id !== currentUser);
    setSendMessage({ ...message, receiverId });
  };

  // always scroll to the last message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  });
  return (
    <>
      {chat ? (
        <div className="ChatBox-container">
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
            {/* <hr
              style={{
                width: "100%",
                border: "1px solid gainsboro",
                opacity: "1",
                margin: "10px 0px 0px 0px",
              }}
            /> */}
          </div>
          {/* ChatBox Messages */}
          <div
            className="chat-body"
            style={{
              backgroundImage: `url(${whatsAppImg})`,
              backgroundSize:'contain'
            }}
          >
            {/* <img src={whatsAppImg} alt="" /> */}
            {messages.map((message: any) => (
              <>
                <div
                  ref={scroll}
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
            <InputEmoji
              value={newMessage}
              onChange={handleChange}
              onKeyDown={(e: any) => {
                if (e.key === "Enter") {
                  handleSend(e);
                }
              }}
            />
            <div className="send-button button" onClick={handleSend}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            </div>
          </div>
        </div>
      ) : (
        <div className="chatbox-empty-message">
          <div className="demo demo-side-panel message-default-screen justify-content-center bg-white">
            <img
              className="demo-logo"
              src={logo}
              alt="Logo"
            />
            <h3 className="mt-5 mb-3 w-50 text-center border-bottom pb-3">
              Automated Business Analyst <br />
              &amp; Project Excavator
            </h3>
            <p> Tap on a Chat to start Conversation...</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBox;
