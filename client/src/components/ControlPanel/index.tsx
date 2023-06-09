import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Button, Card, message } from "antd";
import { setTemplates } from "../../flux/reducers/extras";
import { getTemplatesNames } from "../../api/templates";
import { showMessage } from "../../utils";
import {
  checkWorkExists,
  sendEmails,
  sendEmailsModifies,
  startSearching,
} from "../../api/work";
import { useDispatch, useSelector } from "react-redux";
import { AtomState } from "../../flux/store";
import axios from "axios";

type filtersType = {
  selectedTags: Array<any>;
  templateId: string;
  numOfEmails: number | undefined;
};

function ControlPanel() {
  const {
    auth: {
      user: { tags, _id },
    },
    extras: { templates },
  } = useSelector((state: AtomState) => state);
  const [messageApi, contextHolder] = message.useMessage();
  const [statusMessage, setStatusMessage] = useState("IDLE");
  const [mailSubject, setMailSubject] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fileSelected, setFileSelected] = useState(false);

  const [filters, setFilters] = useState<filtersType>({
    selectedTags: [],
    templateId: "",
    numOfEmails: undefined,
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event: any) => {
    setFilters({ ...filters, selectedTags: [], numOfEmails: undefined });
    setFileSelected(true);
    setSelectedFile(event.target.files[0]);
  };
  const dispatch = useDispatch();

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
    console.log("CHECK", selectedFile);
    const formData = new FormData();
    if (selectedFile) {
      formData.append("single", selectedFile);
      formData.append(
        "additionalData",
        JSON.stringify({ ...filters, subject: mailSubject })
      );
      const { data } = await sendEmailsModifies(formData);
      state.refetch();
      showMessage("success", data.message, messageApi);
      setSelectedFile(null);
      setFileSelected(false);
    } else {
      const { data } = await sendEmails(mailSubject);
      state.refetch();
      showMessage("success", data.message, messageApi);
    }
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const {
        data: {
          work: { status },
        },
      } = await startSearching({
        tags: filters.selectedTags,
        templateId: filters.templateId.split(".")[0],
        emailThreshold: filters.numOfEmails,
      });
      setStatusMessage(status);
      showMessage("success", "Searching in Progress !", messageApi);
    } catch (error) {
      console.log("Error | Dashboard | handleSubmit");
    }
  };

  const state = useQuery(["workStatus"], async () => {
    setIsLoading(true);
    const {
      data: {
        work: { status: workStatus },
      },
    } = await checkWorkExists();
    if (workStatus) {
      setStatusMessage(workStatus);
    }
    setIsLoading(false);
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
  return (
    <>
      {contextHolder}
      <form className="form-dashboard-main" onSubmit={handleSubmit}>
        <label className="email-dashboard-heading mb-1">
          Select Email Template
        </label>
        <div className="input-group mb-3">
          <select
            onChange={(e: any) =>
              setFilters({
                ...filters,
                templateId: e.target.value,
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
          Import Email's(.txt) File
        </label>
        <div className="input-group mb-3">
          <input type="file" onChange={handleFileChange} accept=".txt" />
        </div>
        <label className="email-dashboard-heading mb-1">Select Tags</label>
        <div className="d-flex gap-3 mb-4 tags-p-main">
          {tags.map((tag: string, index) => (
            <p
              className="tags-p m-0"
              style={{
                background: filters.selectedTags.includes(tag) ? "green" : "",
                color: filters.selectedTags.includes(tag) ? "white" : "black",
              }}
              key={index}
              onClick={!fileSelected ? () => handleSelectedTag(tag) : undefined}
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
            disabled={fileSelected}
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
            required={!fileSelected}
          />
          <div className="d-flex gap-2 justify-content-between">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={
                !fileSelected && statusMessage === "IDLE" ? false : true
              }
            >
              Start Searching
            </button>
            <button
              //   id="send-emails"
              type="button"
              className="btn btn-primary"
              disabled={
                fileSelected || statusMessage === "done-searching"
                  ? false
                  : true
              }
              //   onClick={handleSendEmails}
              id="btn-export"
              data-bs-toggle="modal"
              data-bs-target="#nameModal"
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

        <Button
          className="btn btn-success"
          loading={isLoading}
          disabled={isLoading}
          onClick={() => {
            state.refetch();
            showMessage("success", "status re-fetched", messageApi);
          }}
        >
          Check Status
        </Button>
      </div>
      {/* Modal */}
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
                Enter Mail Subject
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
                value={mailSubject}
                onChange={(e) => setMailSubject(e.target.value)}
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
                onClick={handleSendEmails}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ControlPanel;
