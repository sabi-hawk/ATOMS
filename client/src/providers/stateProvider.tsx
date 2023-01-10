import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import store from "../flux/store/index";

function StateProvider({ children }: PropsWithChildren) {
  return <Provider store={store}>{children}</Provider>;
}

export default StateProvider;
