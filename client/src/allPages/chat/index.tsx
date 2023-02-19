import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userChats } from "../../api/conversation";
import Conversation from "../../components/Conversation";
import { setChatsData } from "../../flux/reducers/chats";
import Dashboard from "../../images/home.png";
import Noti from "../../images/noti.png";
import Comment from "../../images/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import ChatBox from "../../components/ChatBox";
import { io } from "socket.io-client";
// import { Socket } from "dgram";

const Chat = () => {
  const user = {
    id: "63c03518077d70ab9ca19a1c",
  };
  // const { user } = useSelector((state: any) => state.user);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const socket = useRef<any>();

  const dispatch = useDispatch();
  const [onlineUsers, setOnlineUsers] = useState([]);
  useEffect(() => {
    //@ts-ignore
    socket.current = io("http://localhost:3002");
    socket?.current?.emit("new-user-add", user.id);
    socket.current.on("get-users", (users: any) => {
      setOnlineUsers(users);
    });
  }, []); // [user]
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user.id);

        dispatch(setChatsData(data));
        setChats(data);
        console.log("Chats", chats);
      } catch (error) {
        console.log("Error | Pages | Chat", error);
      }
    };
    getChats();
  }, []); //[user]
  return (
    <div className="chat">
      <div className="left-side-chat">
        <div className="chat-container">
          <h2>Chats</h2>
          <div className="chat-list">
            {chats.map((chat, key) => (
              <div key={key} onClick={() => setCurrentChat(chat)}>
                <Conversation data={chat} currentUserId={user.id} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="right-side-chat">
        <div /*style={{ width: "20rem", alignSelf: "flex-end" }}*/>
          {/* <div className="navIcons">
            <Link to="../dashboard">
              <img src={Dashboard} alt="" />
            </Link>
            <UilSetting />
            <img src={Noti} alt="" />
            <Link to="../chat">
              <img src={Comment} alt="" />
            </Link>
          </div> */}
          <ChatBox chat={currentChat} currentUser={user.id} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
