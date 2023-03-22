import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../flux/reducers/auth";
import { setChatsData } from "../flux/reducers/chats";
import { setTemplates } from "../flux/reducers/extras";

type Name = {
  first: string;
  last: string;
};

function ErrorComponent() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUser({}));
    dispatch(setChatsData({}));
  }, []);
}
export const prettyName = (name: Name) => {
  return `${name?.first.charAt(0).toUpperCase()}${name?.first.slice(
    1
  )} ${name?.last.charAt(0).toUpperCase()}${name?.last.slice(1)}`;
};

export const LogoutUtil = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  dispatch(setUser({}));
  dispatch(setChatsData({}));
  dispatch(setTemplates({}));
  navigate("/");
};
export default ErrorComponent;

export function useUnauthorized() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleUnauthorized() {
    dispatch(setUser({}));
    dispatch(setChatsData({}));
    dispatch(setTemplates({}));
    navigate("/");
  }

  return handleUnauthorized;
}
