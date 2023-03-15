import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userChats } from "../../api/conversation";
import Conversation from "../../components/Conversation";
import { setChatsData } from "../../flux/reducers/chats";
import ChatBox from "../../components/ChatBox";
import { io } from "socket.io-client";
import { AtomState } from "../../flux/store";
import { setUser } from "../../flux/reducers/auth";
import socket from "../../utils/socket";

function Chat() {
  const user = useSelector((state: AtomState) => state?.auth?.user);
  if (!user) {
    console.log("user doesn't exists in chat");
  }
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);

  const dispatch = useDispatch();
  // const socket = useRef<any>();

  // initializing socket
  useEffect(() => {
    // socket.current = io("http://localhost:3002");
    socket.emit("new-user-add", user._id);
    socket.on("get-users", (users: any) => {
      setOnlineUsers(users);
      console.log(onlineUsers);
    });
  }, [user]); // [user]

  useEffect(() => {
    // adding event listener for window unload
    console.log("Started listening for event beforeunload");
    window.addEventListener("beforeunload", handleWindowUnload);

    // remove event listener when component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleWindowUnload);
    };
  }, []);

  const handleWindowUnload = () => {
    socket.emit("disconnected");
  };
  // send message to the socket server
  useEffect(() => {
    if (sendMessage !== null) {
      console.log("sending message", sendMessage);
      socket.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // receive message from socket server
  useEffect(() => {
    socket.on("receive-message", (data: any) => {
      console.log("Recieving message", data);
      setReceiveMessage(data);
    });
  }, []);

  useEffect(() => {
    console.log("inside getting chat ");
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id, user.token);

        dispatch(setChatsData(data));
        setChats(data);
        console.log("Chats", chats);
      } catch (error: any) {
        if (error.response.status === 401) {
          dispatch(setUser({}));
          dispatch(setChatsData({}));
        }
        console.log("Error | Pages | Chat", error);
      }
    };
    getChats();
  }, [user]); //[user]

  const checkOnlineStatus = (chat: any) => {
    const chatMember = chat.members.find((member: any) => member !== user._id);
    const online = onlineUsers.find((user: any) => user.userId === chatMember);
    return online ? true : false;
  };
  // const handleSetCurrentChat = ({ event, chat }) => {
  //   setCurrentChat(chat);
  // };
  return (
    <div className="chat p-4">
      <div className="left-side-chat">
        <div className="chat-container">
          <div className="left-side-header">
            <h2 className="m-0">Chats</h2>
          </div>
          <div className="chat-list px-4">
            {chats.map((chat, key) => (
              <div key={key} onClick={() => setCurrentChat(chat)}>
                <Conversation
                  data={chat}
                  currentUserId={user._id}
                  online={checkOnlineStatus(chat)}
                />
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
          <ChatBox
            chat={currentChat}
            setSendMessage={setSendMessage}
            receiveMessage={receiveMessage}
          />
        </div>
      </div>
    </div>
  );
}

export default Chat;
