import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { checkWorkExists, startSearching } from "../../api/work";
import "../../css/index.css";
import { AtomState } from "../../flux/store";
import "./index.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Graph from "../../components/Graphs";

type filtersType = {
  selectedTags: Array<any>;
  templateID: string;
  numOfEmails: number | undefined;
};
function Dashboard() {
  const [filters, setFilters] = useState<filtersType>({
    selectedTags: [],
    templateID: "",
    numOfEmails: undefined,
  });

  const {
    auth: {
      user: { tags, token },
    },
    extras: { templates },
  } = useSelector((state: AtomState) => state);

  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data } = await startSearching({
        tags: filters.selectedTags,
        templateId: filters.templateID,
        emailThreshold: filters.numOfEmails,
        token: token,
      });
      toast.success("Searching in Progress!", {
        autoClose: 3000,
      });
      console.log("Work Response", data);
    } catch (error) {
      console.log("Error | Dashboard | handleSubmit");
    }
  };
  useEffect(() => {
    const statusCheck = async () => {
      const { status, data } = await checkWorkExists(token);
      if (status === 200) {
        setStatusMessage("work is already in progress");
      }
    };
    statusCheck();
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
                            min="10"
                            max="100"
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
                              className={`btn btn-primary ${
                                statusMessage !== "" && "btn-disable"
                              }`}
                            >
                              Start Searching
                            </button>
                            <button
                              id="send-emails"
                              type="button"
                              className="btn btn-primary btn-disable"
                            >
                              Send Emails
                            </button>
                          </div>
                        </div>
                      </form>

                      <div className="d-flex form-dashboard-main justify-content-between mb-0 align-items-center">
                        {statusMessage !== "" ? (
                          <div>
                            <small>{statusMessage}</small>
                            <p className="m-0">Status : Searching</p>
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
                      Revenue Sources
                    </h6>
                  </div>
                  {/* Card Body */}
                  <div className="card-body">
                    <div className="chart-pie pt-4 pb-2">
                      <Graph />
                    </div>
                    <div className="mt-4 text-center small">
                      <span className="mr-2">
                        <i className="fas fa-circle text-primary" /> Direct
                      </span>
                      <span className="mr-2">
                        <i className="fas fa-circle text-success" /> Social
                      </span>
                      <span className="mr-2">
                        <i className="fas fa-circle text-info" /> Referral
                      </span>
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
                      Illustrations
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

{
  /* Color System */
}
{
  /* <div className="row">
                <div className="col-lg-6 mb-4">
                  <div className="card bg-primary text-white shadow">
                    <div className="card-body">
                      Primary
                      <div className="text-white-50 small">#4e73df</div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 mb-4">
                  <div className="card bg-success text-white shadow">
                    <div className="card-body">
                      Success
                      <div className="text-white-50 small">#1cc88a</div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 mb-4">
                  <div className="card bg-info text-white shadow">
                    <div className="card-body">
                      Info
                      <div className="text-white-50 small">#36b9cc</div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 mb-4">
                  <div className="card bg-warning text-white shadow">
                    <div className="card-body">
                      Warning
                      <div className="text-white-50 small">#f6c23e</div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 mb-4">
                  <div className="card bg-danger text-white shadow">
                    <div className="card-body">
                      Danger
                      <div className="text-white-50 small">#e74a3b</div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 mb-4">
                  <div className="card bg-secondary text-white shadow">
                    <div className="card-body">
                      Secondary
                      <div className="text-white-50 small">#858796</div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 mb-4">
                  <div className="card bg-light text-black shadow">
                    <div className="card-body">
                      Light
                      <div className="text-black-50 small">#f8f9fc</div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 mb-4">
                  <div className="card bg-dark text-white shadow">
                    <div className="card-body">
                      Dark
                      <div className="text-white-50 small">#5a5c69</div>
                    </div>
                  </div>
                </div>
              </div> */
}
