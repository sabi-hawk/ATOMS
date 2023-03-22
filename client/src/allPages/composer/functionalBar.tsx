import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AtomState } from "../../flux/store";
const FunctionalBar = ({
  exportHtml,
  loadDesign,
  handleSelectChange,
  handleSendEmail,
}: any) => {
  const [designName, setDesignName] = useState("");
  const {
    auth: {
      user: { _id },
    },
    extras: { templates },
  } = useSelector((state: AtomState) => state);
  const chatLink = `http://localhost:3000/provider/${_id}/chat`;
  const [isCopied, setIsCopied] = useState(false);
  return (
    <>
      <div className="template-controls my-2">
        <select onChange={handleSelectChange} className="btn btn-secondary">
          <option value=""> Choose Template</option>
          {templates?.map((name: string, index) => (
            <option value={name}>
              {name.includes("design")
                ? name.split(".")[0]
                : name.split(".")[1]}
            </option>
          ))}
        </select>
        <div className="composer-input-group flex-nowrap mb-3">
          <span className="input-group-text" id="addon-wrapping">
            LINK
          </span>
          <input
            readOnly
            type="text"
            className="form-control"
            placeholder="Name"
            value={chatLink}
            aria-label="Username"
            aria-describedby="addon-wrapping"
          />
          <span className="input-group-text span-copy" id="addon-wrapping">
            <button
              disabled={isCopied}
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(chatLink);
                setIsCopied(true);
                setTimeout(() => {
                  setIsCopied(false);
                }, 3000);
              }}
            >
              {isCopied ? "Copied" : "Copy"}
            </button>
          </span>
        </div>
        <div>
          <button
            className="btn btn-primary mr-2"
            id="btn-export"
            onClick={handleSendEmail}
          >
            Send Email
          </button>
          <button
            className="btn btn-primary mr-2"
            id="btn-export"
            data-bs-toggle="modal"
            data-bs-target="#nameModal"
          >
            Save Design
          </button>
          <button
            className="btn btn-secondary"
            onClick={(event) => loadDesign(event, "")}
          >
            Empty Editor
          </button>
        </div>
      </div>
      <div
        className="modal fade"
        id="nameModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Enter Template Name
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <input
                value={designName}
                onChange={(e) => setDesignName(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                data-bs-toggle="modal"
                data-bs-target="#nameModal"
                type="button"
                className="btn btn-primary"
                onClick={() => exportHtml(designName)}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FunctionalBar;
