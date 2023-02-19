import { useDispatch } from "react-redux";
import { setUser } from "../flux/reducers/auth";
import { setChatsData } from "../flux/reducers/chats";

function useActions() {
  const EmptyAppState = () => {
    const dispatch = useDispatch();
    dispatch(setUser({}));
    dispatch(setChatsData({}));
  };

  return { EmptyAppState };
}
export default useActions;

export const EmptyAppState = () => {
    const dispatch = useDispatch();
    dispatch(setUser({}));
    dispatch(setChatsData({}));
}
