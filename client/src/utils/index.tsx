import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../flux/reducers/auth";
import { setChatsData } from "../flux/reducers/chats";

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
export const prettyName = ({ first, last }: Name) => {
  return `${first.charAt(0).toUpperCase()}${first.slice(1)} ${last
    .charAt(0)
    .toUpperCase()}${last.slice(1)}`;
};
export default ErrorComponent;
