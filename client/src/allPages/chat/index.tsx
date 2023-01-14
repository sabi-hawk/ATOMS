import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userChats } from "../../api/chat";
import { setChatsData } from "../../flux/reducers/chats";
const Chat = () => {
  const user: string = "123";
  // const { user } = useSelector((state: any) => state.user);
  const [chats, setChats] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats("63c03518077d70ab9ca19a1c");
        
        dispatch(setChatsData(data));
        setChats(data);
        console.log("Chats", chats);
      } catch (error) {
        console.log("Error | Pages | Chat", error);
      }
    };
    getChats();
  }, [user]);
  return (
    <div className="chat">
      <div className="left-side-chat">
        <div className="chat-container">
          <h2>Chats</h2>
          <div className="chat-list">Conversations</div>
        </div>
      </div>
      <div className="right-side-chat"></div>
    </div>
  );
};

export default Chat;
