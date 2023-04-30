import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkWorkExists, sendEmails, startSearching } from "../../api/work";
import { AtomState } from "../../flux/store";
import { useQuery } from "react-query";
import { message } from "antd";
import { setTemplates } from "../../flux/reducers/extras";
import { getTemplatesNames } from "../../api/templates";
import { showMessage } from "../../utils";
import EmailChart from "../../components/Graphs/LineChart";
import "react-toastify/dist/ReactToastify.css";
import "../../css/index.css";
import "./index.css";

type filtersType = {
  selectedTags: Array<any>;
  templateID: string;
  numOfEmails: number | undefined;
};
function Dashboard() {
  const [messageApi, contextHolder] = message.useMessage();

  const [filters, setFilters] = useState<filtersType>({
    selectedTags: [],
    templateID: "",
    numOfEmails: undefined,
  });
  const {
    auth: {
      user: { tags, token, _id },
    },
    extras: { templates },
  } = useSelector((state: AtomState) => state);
  const dispatch = useDispatch();
  const [statusMessage, setStatusMessage] = useState("IDLE");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const {
        data: {
          work: { status },
        },
      } = await startSearching({
        tags: filters.selectedTags,
        templateId: filters.templateID.split(".")[0],
        emailThreshold: filters.numOfEmails,
      });
      setStatusMessage(status);
      showMessage("success", "Searching in Progress !", messageApi);
    } catch (error) {
      console.log("Error | Dashboard | handleSubmit");
    }
  };

  const state = useQuery(["workStatus"], async () => {
    const {
      data: {
        work: { status: workStatus },
      },
    } = await checkWorkExists();
    if (workStatus) {
      setStatusMessage(workStatus);
    }
  });

  useEffect(() => {
    const statusCheck = async () => {
      const {
        status,
        data: {
          work: { status: workStatus },
        },
      } = await checkWorkExists();

      if (workStatus) {
        setStatusMessage(workStatus);
      }
    };
    statusCheck();
  }, []);

  useEffect(() => {
    const getTemplateNames = async () => {
      const { data } = await getTemplatesNames(_id);
      dispatch(setTemplates(data.files));
    };
    getTemplateNames();
  }, []);

  const handleSelectedTag = (tag: string) => {
    if (filters.selectedTags.includes(tag)) {
      setFilters({
        ...filters,
        selectedTags: filters.selectedTags.filter((t) => t !== tag),
      });
    } else {
      setFilters({ ...filters, selectedTags: [...filters.selectedTags, tag] });
    }
  };

  const handleSendEmails = async () => {
    const { data } = await sendEmails();
    state.refetch();
    showMessage("success", data.message, messageApi);
  };

  return (
    <>
      {/* Content Wrapper */}
      {contextHolder}
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
                      <form
                        className="form-dashboard-main"
                        onSubmit={handleSubmit}
                      >
                        <label className="email-dashboard-heading mb-1">
                          Select Email Template
                        </label>
                        <div className="input-group mb-3">
                          <select
                            onChange={(e: any) =>
                              setFilters({
                                ...filters,
                                templateID: e.target.value,
                              })
                            }
                            className="custom-select"
                            required
                          >
                            <option value=""> Choose Template</option>
                            {templates?.map((name: string, index) => (
                              <option key={index} value={name}>
                                {name.includes("design")
                                  ? name.split(".")[0]
                                  : name.split(".")[1]}
                              </option>
                            ))}
                          </select>
                        </div>

                        <label className="email-dashboard-heading mb-1">
                          Select Tags
                        </label>
                        <div className="d-flex gap-3 mb-4 tags-p-main">
                          {tags.map((tag: string, index) => (
                            <p
                              className="tags-p m-0"
                              style={{
                                background: filters.selectedTags.includes(tag)
                                  ? "green"
                                  : "",
                                color: filters.selectedTags.includes(tag)
                                  ? "white"
                                  : "black",
                              }}
                              key={index}
                              onClick={() => handleSelectedTag(tag)}
                            >
                              {tag}
                            </p>
                          ))}
                        </div>

                        <label className="email-dashboard-heading mb-1">
                          Set Email Threshold
                        </label>
                        <div className="d-flex submit-dashboard gap-2 justify-content-between">
                          <input
                            className="form-control w-25"
                            min="1"
                            max="10"
                            type="number"
                            value={filters.numOfEmails || ""}
                            onChange={(event) =>
                              setFilters({
                                ...filters,
                                numOfEmails: Number(event.target.value),
                              })
                            }
                            required
                          />
                          <div className="d-flex gap-2 justify-content-between">
                            <button
                              type="submit"
                              className="btn btn-primary"
                              disabled={statusMessage === "IDLE" ? false : true}
                            >
                              Start Searching
                            </button>
                            <button
                              id="send-emails"
                              type="button"
                              className="btn btn-primary"
                              disabled={
                                statusMessage === "done-searching"
                                  ? false
                                  : true
                              }
                              onClick={handleSendEmails}
                            >
                              Send Emails
                            </button>
                          </div>
                        </div>
                      </form>

                      <div className="d-flex form-dashboard-main justify-content-between mb-0 align-items-center">
                        {statusMessage !== "" ? (
                          <div>
                            <small>
                              {statusMessage === "done-searching"
                                ? "Searching is Completed now you can send emails"
                                : "Searching in Progress"}
                            </small>
                            <p className="m-0">Status : {statusMessage}</p>
                          </div>
                        ) : (
                          <p className="m-0">Status : IDLE</p>
                        )}

                        <button type="button" className="btn btn-success">
                          Check Status
                        </button>
                      </div>
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
                    <div className="text-center">
                      <img
                        className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                        style={{ width: "25rem" }}
                        src="img/undraw_posting_photo.svg"
                        alt="..."
                      />
                    </div>
                    <p>
                      Add some quality, svg illustrations to your project
                      courtesy of{" "}
                      <a
                        target="_blank"
                        rel="nofollow"
                        href="https://undraw.co/"
                      >
                        unDraw
                      </a>
                      , a constantly updated collection of beautiful svg images
                      that you can use completely free and without attribution!
                    </p>
                    <a target="_blank" rel="nofollow" href="https://undraw.co/">
                      Browse Illustrations on unDraw →
                    </a>
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
