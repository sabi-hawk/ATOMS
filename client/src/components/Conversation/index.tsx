import React, { useEffect, useState } from "react";
import { getUser } from "../../api/user";
import { prettifyName } from "../../hooks/formating";

type IInputWrapperProps = {
  data?: any;
  currentUserId?: string;
  wrapperStyle?: React.CSSProperties;
  children?: JSX.Element | JSX.Element[];
};
const Conversation = ({ data, currentUserId }: IInputWrapperProps) => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const userId = data.members.find((id: any) => id !== currentUserId);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log("Error | Chat | Conversation | getUserData", error);
      }
    };
    getUserData();
  }, []);
  return (
    <>
      <div className="follower conversation">
        <div className="chat-card-container">
          <div className="online-dot"></div>
          <img
            src={
              userData?.profilePicture
                ? process.env.REACT_APP_PUBLIC_FOLDER + userData?.profilePicture
                : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"
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
            <span>Online</span>
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
};

export default Conversation;
