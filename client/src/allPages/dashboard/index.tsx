import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AtomState } from "../../flux/store";

import EmailChart from "../../components/Graphs/LineChart";
import "react-toastify/dist/ReactToastify.css";
import "../../css/index.css";
import "./index.css";
import { userChats } from "../../api/conversation";
import { setChatsData } from "../../flux/reducers/chats";
import { setUser } from "../../flux/reducers/auth";
import Conversation from "../../components/Conversation";
import { useNavigate } from "react-router-dom";
import ControlPanel from "../../components/ControlPanel";

function Dashboard() {
  const user = useSelector((state: AtomState) => state?.auth?.user);
  const navigate = useNavigate();

  const [chats, setChats] = useState([]);

  const dispatch = useDispatch();

  const gotToChats = () => {
    navigate("/chat");
  };

  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);

        dispatch(setChatsData(data));
        setChats(data);
      } catch (error: any) {
        if (error.response.status === 401) {
          dispatch(setUser({}));
          dispatch(setChatsData({}));
        }
        console.log("Error | Pages | Chat", error);
      }
    };
    getChats();
  }, [user]); //[user]
  return (
    <>
      {/* Content Wrapper */}

      <div id="content-wrapper" className="d-flex flex-column">
        {/* Main Content */}
        <div id="content">
          {/* Begin Page Content */}
          <div className="container-fluid">
            {/* Page Heading */}
            <div className="d-sm-flex align-items-center justify-content-between mb-4 mt-4">
              <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
              <button className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                <i className="fas fa-download fa-sm text-white-50" /> Generate
                Report
              </button>
            </div>

            <div className="row dashboard-custom-row mb-4">
              {/* Area Chart */}
              <div className="w-100">
                <div className="card shadow ">
                  {/* Card Header - Dropdown */}
                  <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">
                      Control Panel
                    </h6>
                  </div>
                  {/* Card Body */}
                  <div className="card-body">
                    <div className="chart-area">
                      <ControlPanel />
                    </div>
                  </div>
                </div>
              </div>
              {/* Pie Chart */}
              <div className="w-100">
                <div className="card shadow ">
                  {/* Card Header - Dropdown */}
                  <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">
                      Email Volume Trend
                    </h6>
                  </div>
                  {/* Card Body */}
                  <div className="card-body">
                    <div className="chart-pie pt-4 pb-2">
                      <EmailChart />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Content Row */}
            <div className="row dashboard-custom-row mb-4">
              {/* Content Column */}
              <div className="w-100">
                {/* Project Card Example */}
                <div className="card shadow ">
                  <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">
                      Projects
                    </h6>
                  </div>
                  <div className="card-body">
                    <h4 className="small font-weight-bold">
                      Server Migration <span className="float-right">20%</span>
                    </h4>
                    <div className="progress mb-4">
                      <div
                        className="progress-bar bg-danger"
                        role="progressbar"
                        style={{ width: "20%" }}
                        aria-valuenow={20}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <h4 className="small font-weight-bold">
                      Sales Tracking <span className="float-right">40%</span>
                    </h4>
                    <div className="progress mb-4">
                      <div
                        className="progress-bar bg-warning"
                        role="progressbar"
                        style={{ width: "40%" }}
                        aria-valuenow={40}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <h4 className="small font-weight-bold">
                      Customer Database <span className="float-right">60%</span>
                    </h4>
                    <div className="progress mb-4">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: "60%" }}
                        aria-valuenow={60}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <h4 className="small font-weight-bold">
                      Payout Details <span className="float-right">80%</span>
                    </h4>
                    <div className="progress mb-4">
                      <div
                        className="progress-bar bg-info"
                        role="progressbar"
                        style={{ width: "80%" }}
                        aria-valuenow={80}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <h4 className="small font-weight-bold">
                      Account Setup{" "}
                      <span className="float-right">Complete!</span>
                    </h4>
                    <div className="progress">
                      <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: "100%" }}
                        aria-valuenow={100}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-100">
                {/* Illustrations */}
                <div className="card shadow ">
                  <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">
                      Active Chats
                    </h6>
                  </div>
                  <div className="card-body">
                    {chats.map((chat, key) => (
                      <div key={key} onClick={() => gotToChats()}>
                        <Conversation
                          data={chat}
                          currentUserId={user._id}
                          isActiveChat={true}
                          key={key}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </div>
        {/* End of Main Content */}
        {/* Footer */}
        <footer className="sticky-footer bg-white"></footer>
        {/* End of Footer */}
      </div>
      {/* End of Content Wrapper */}
    </>
  );
}

export default Dashboard;
