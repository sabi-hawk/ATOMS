import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AtomState } from "../../flux/store";
const FunctionalBar = ({ exportHtml, loadDesign, handleSelectChange }: any) => {
  const [designName, setDesignName] = useState("");
  const {
    extras: { templates },
  } = useSelector((state: AtomState) => state);
  return (
    <>
      <div className="template-controls">
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
        <div>
          <button
            className="btn btn-primary"
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
                Modal title
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
