import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUser } from "../../api/user";
import { AtomState } from "../../flux/store";
import { prettifyName } from "../../hooks/formating";

type IInputWrapperProps = {
  data?: any;
  currentUserId?: string;
  wrapperStyle?: React.CSSProperties;
  online: Boolean;
  children?: JSX.Element | JSX.Element[];
};
const Conversation = ({ data, currentUserId, online }: IInputWrapperProps) => {
  const [userData, setUserData] = useState<any>(null);
  const user = useSelector((state: AtomState) => state?.auth?.user);
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
          <div className={online ? 'online-dot' : 'offline-dot'}></div>
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
            <span>{online ? "Online" : "Offline"}</span>
          </div>
        </div>
      </div>
      <hr style={{ width: "100%", border: "1px solid #707071", margin:"10px 0px" }} />
    </>
  );
};

export default Conversation;
