import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../flux/reducers/auth";
import { setChatsData } from "../flux/reducers/chats";

function ErrorComponent() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUser({}));
    dispatch(setChatsData({}));
  }, []);
}
export default ErrorComponent;
