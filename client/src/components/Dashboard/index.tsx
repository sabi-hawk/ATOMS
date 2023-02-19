import React from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../flux/reducers/auth";
import { setChatsData } from "../../flux/reducers/chats";
import { logout } from "../../flux/reducers";
import useActions from "../../hooks";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { EmptyAppState } = useActions();
  const handleLogout = () => {
    // dispatch({ type: "USER_LOGOUT", data: undefined });
    // dispatch({ type: "RESET_STATE" });
    // dispatch(logout());
    // EmptyAppState();
    dispatch(setUser({}));
    dispatch(setChatsData({}));
    navigate("/");
  };
  return (
    <div>
      Dashboard
      <button type="button" onClick={handleLogout}>
        {" "}
        logout
      </button>
    </div>
  );
}

export default Dashboard;
