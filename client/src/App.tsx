import { useSelector } from "react-redux";
import Demo from "./components/Demo";
import Navbar from "./components/Navbar";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import About from "./components/About";
import Dashboard from "./allPages/dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Composer from "./allPages/composer";
import Chat from "./allPages/chat";
import Authentication from "./allPages/auth";
import { AtomState } from "./flux/store";
import ClientAuthentication from "./allPages/client/auth";
import UserLogs from "./allPages/UserLogs";

const App = () => {
  const user = useSelector((state: AtomState) => state?.auth?.user);

  if (user) {
    if (!user.isClient) {
      return (
        <>
          <div className="main d-flex">
            <div className="left-panel">
              <Navbar />
            </div>
            <div className="right-panel w-100">
              <Routes>
                <Route
                  path="/"
                  element={
                    user ? <Navigate to="dashboard" /> : <Navigate to="auth" />
                  }
                />
                <Route
                  path="/dashboard"
                  element={user ? <Dashboard /> : <Navigate to="../auth" />}
                />
                <Route
                  path="/auth"
                  element={
                    user ? <Navigate to="../dashboard" /> : <Authentication />
                  }
                />
                <Route
                  path="/mail-templates"
                  element={user ? <Composer /> : <Navigate to="../auth" />}
                />
                <Route
                  path="/about"
                  element={user ? <About /> : <Navigate to="../auth" />}
                />
                <Route
                  path="/demo"
                  element={user ? <Demo /> : <Navigate to="../auth" />}
                />
                <Route
                  path="/chat"
                  element={user ? <Chat /> : <Navigate to="../auth" />}
                />
                <Route
                  path="/logs"
                  element={user ? <UserLogs /> : <Navigate to="../logs" />}
                />
                <Route
                  path="*"
                  element={
                    user ? (
                      <Navigate to="../dashboard" />
                    ) : (
                      <Navigate to="../auth" />
                    )
                  }
                />
              </Routes>
            </div>
          </div>

          <ToastContainer />
        </>
      );
    }

    // for client
    return (
      <>
        <div className="main d-flex">
          <div className="left-panel">
            <Navbar />
          </div>
          <div className="right-panel w-100">
            <Routes>
              <Route
                path="/chat"
                element={user ? <Chat /> : <Navigate to="/auth" />}
              />
              <Route
                path="*"
                element={
                  user ? <Navigate to="../chat" /> : <Navigate to="../auth" />
                }
              />
            </Routes>
          </div>
        </div>

        <ToastContainer />
      </>
    );
  }

  return (
    <>
      <div className="main d-flex">
        <div className="right-panel w-100">
          <Routes>
            <Route path="/" element={<Navigate to="/auth" replace />} />
            <Route path="/auth" element={<Authentication />} />
            <Route
              path="/provider/:provider_id/chat"
              element={<ClientAuthentication />}
            />
            <Route path="*" element={<Navigate to="../auth" />} />
          </Routes>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
export default App;
