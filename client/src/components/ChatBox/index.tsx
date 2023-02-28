import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import { getMessages, sendMessage } from "../../api/conversation";
import { getUser } from "../../api/user";
import { prettifyName } from "../../hooks/formating";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import { useSelector } from "react-redux";
import user from "../../flux/reducers/auth";
import { AtomState } from "../../flux/store";

const ChatBox = ({
  chat, // there was also currentUser
  setSendMessage,
  receiveMessage,
}: any) => {
  // const {
  //   user: { userId, userName },
  //   chats: { chatId }
  // } = useSelector((state: AtomState) => state);

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
              <hr
                style={{
                  width: "100%",
                  border: "1px solid rgb(112, 112, 113)",
                }}
              />
            </div>
            {/* ChatBox Messages */}
            <div className="chat-body">
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
                <InputEmoji value={newMessage} onChange={handleChange} onKeyDown={(e: any) => {
                  if(e.key === 'Enter') {
                    handleSend(e);
                  }
                }}/>
              <div className="send-button button" onClick={handleSend}>
                Send
              </div>
            </div>
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on a Chat to start Conversation...
          </span>
        )}
      </div>
    </>
  );
};

export default ChatBox;
