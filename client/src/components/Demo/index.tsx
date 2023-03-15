import React, { useState } from "react";
import Graph from "../Graphs";
import logo from "../../images/logo.svg";
import Form from "../Form";
import Lotties from "../meta/Lotties";
import DemoTable from "../CreateTables/DemoTable";

function Demo() {
  const [emailsLoading, setEmailsLoading] = useState(true);
  const [formStatus, setFormStatus] = useState(false);
  const [modalState, setModalState] = useState(false);

  return (
    <>
      <section className="background-radial-gradient overflow-hidden">
        <div className="container-fluid text-left text-lg-start h-100">
          <div className="row gx-lg-5 align-items-center mb-5 h-100">
            <div className="col-lg-4 ml-5 pl-5 mb-5 mb-lg-0 position-relative">
              <div
                id="radius-shape-1"
                className="position-absolute rounded-circle shadow-5-strong"
              />
              <div
                id="radius-shape-2"
                className="position-absolute shadow-5-strong"
              />
              <div className="card bg-glass">
                <div className="card-body px-4 py-5 px-md-5">
                  <h3 className="mb-4 display-5 fw-bold ls-tight">
                    {" "}
                    Search Information
                  </h3>
                  <Form
                    setFormStatus={setFormStatus}
                    setEmailsLoading={setEmailsLoading}
                  />
                </div>
              </div>
            </div>
            {formStatus || false ? (
              <div className="demo col-lg-7 pl-5 ml-5 justify-content-center">
                {(formStatus || true) && (
                  <>
                    <Lotties emailsLoading={emailsLoading} />
                    {!emailsLoading ? (
                      <>
                        <DemoTable />
                        <button
                          type="button"
                          className="btn btn-primary mt-2 ml-auto"
                          onClick={() => setModalState(true)}
                        >
                          Statistics
                        </button>
                        {modalState && (
                          <div
                            className="modal fade"
                            id="exampleModalScrollable"
                            tabIndex={-1}
                            role="dialog"
                            aria-labelledby="exampleModalScrollableTitle"
                            aria-hidden="true"
                          >
                            <div
                              className="modal-dialog modal-dialog-scrollable"
                              role="document"
                            >
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5
                                    className="modal-title"
                                    id="exampleModalScrollableTitle"
                                  >
                                    Statistics
                                  </h5>
                                  <button
                                    onClick={() => setModalState(false)}
                                    type="button"
                                    className="close"
                                    aria-label="Close"
                                  >
                                    <span aria-hidden="true">×</span>
                                  </button>
                                </div>
                                <div className="modal-body">
                                  <Graph />
                                </div>
                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setModalState(false)}
                                  >
                                    Close
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="demo demo-side-panel w-100 justify-content-center bg-white">
                        <img className="demo-logo" src={logo} alt="Logo" />
                        <div className="w-100 d-flex mt-4 justify-content-center align-items-center">
                          <h3 className="text-center mr-5">
                            Search in Progress
                          </h3>
                          <div className="">
                            <div className="snippet" data-title="dot-windmill">
                              <div className="stage">
                                <div className="dot-windmill"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            ) : (
              <div className="demo demo-side-panel col-lg-7 pl-5 ml-5 justify-content-center bg-white">
                <img className="demo-logo" src={logo} alt="Logo" />
                <h3 className="mt-5 mb-3 w-50 text-center border-bottom pb-3">
                  Automated Business Analyst <br />& Project Excavator
                </h3>
                <p> Fill out the required fields in left panel to proceed</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Demo;
