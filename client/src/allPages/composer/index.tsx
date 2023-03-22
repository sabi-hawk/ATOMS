import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import EmailEditor, {
  FileInfo,
  FileUploadDoneCallback,
  HtmlExport,
  HtmlOptions,
} from "react-email-editor";
import fs from "fs";
import {
  getDesign,
  getTemplatesNames,
  saveTemplate,
} from "../../api/templates";
import { useDispatch, useSelector } from "react-redux";
import { AtomState } from "../../flux/store";
import FunctionalBar from "./functionalBar";
import "./index.css";
import { toast } from "react-toastify";
import { setTemplates } from "../../flux/reducers/extras";
import { sendEmail } from "../../api/conversation";

function Composer() {
  const {
    auth: {
      user: { _id, token },
    },
  } = useSelector((state: AtomState) => state);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [designNames, setDesignNames] = useState([]);
  const emailEditorRef: any = useRef(null);
  const dispatch = useDispatch();

  const handleSelectChange = async (event: any) => {
    try {
      const { data } = await getDesign(event.target.value, token);
      emailEditorRef.current.editor.loadDesign(data.design);
    } catch (err) {
      console.log("Error | Composer | handleSelectChange", err);
    }
  };
  useEffect(() => {
    const getTemplateNames = async () => {
      try {
        const { data } = await getTemplatesNames(_id, token);
        setDesignNames(data.files);
        dispatch(setTemplates(data.files));
        console.log("FOUND TEMPLATE NAMES", data.files);
      } catch (err) {
        console.log("Error | Composer | getDesigns", err);
      }
    };
    getTemplateNames();
  }, []);
  const exportHtml = async (designName: string) => {
    // @ts-ignore
    emailEditorRef?.current?.editor?.exportHtml(async (data: HtmlExport) => {
      const { design, html } = data;
      console.log("DESIGN ON EXPORT", data.design);
      try {
        const { data } = await saveTemplate(_id, token, design, designName);
        //
        const { data: namesList } = await getTemplatesNames(_id, token);
        setDesignNames(namesList.files);
        dispatch(setTemplates(namesList.files));
        toast.success(data.message, {
          autoClose: 3000,
        });
        console.log("Design Saved", data);
      } catch (err) {
        console.log("Error | Composer | ExportHTML", err);
      }
    });
  };
  const exportHtmlA = async () => {
    // @ts-ignore
    emailEditorRef?.current?.editor?.exportHtml(async (data: HtmlExport) => {
      const { html } = data;
      console.log("DESIGN ON EXPORT", html);
      const response = await axios.post(
        "http://localhost:3001/api/conversation",
        {
          to: "receiver@gmail.com",
          from: "sender@gmail.com",
          subject: "FYP-2 Submission",
          htmlContent: html,
        }
      );
      console.log("data", response.data);
    });
  };
  const onLoad = async () => {
    setIsLoading(true);
    const { data } = await axios.get(
      "http://localhost:3001/api/templates/design"
    );
    console.log("DESIGN ON LOAD", data.design);
    // @ts-ignore
    emailEditorRef.current.editor.loadDesign(data.design);
  };

  const loadDesign = async (event: any, name: string) => {
    event.preventDefault();
    const { data } = await axios.get(
      `http://localhost:3001/api/templates/design?name=${name}`
    );
    emailEditorRef.current.editor.loadDesign(data.design);
  };
  const emptyEditor = async () => {
    const { data } = await axios.get(
      "http://localhost:3001/api/templates/design?empty=1"
    );
    console.log("DESIGN ON LOAD", data.design);
    // @ts-ignore
    emailEditorRef.current.editor.loadDesign(data.design);
  };
  const loadDefault = async () => {
    const { data } = await axios.get(
      "http://localhost:3001/api/templates/design?empty=0&name=default_1"
    );
    console.log("DESIGN ON LOAD", data.design);
    // @ts-ignore
    emailEditorRef.current.editor.loadDesign(data.design);
  };
  const onReady = async () => {
    // editor is ready
    setIsLoading(false);
    // @ts-ignore
    emailEditorRef.current.editor.registerCallback(
      "image",
      async function (file: FileInfo, done: FileUploadDoneCallback) {
        const formData = new FormData();
        const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };
        console.log("FILE", file);
        formData.append("single", file.attachments[0]);
        const { data } = await axios.post(
          "http://localhost:3001/api/media/upload",
          formData,
          { headers: config.headers }
        );
        console.log("Inside Register CallBack", data);
        // Do something to upload the image and return the URL of the uploaded image
        done({
          url: `http://localhost:3001/images/` + data.nameList[0],
          progress: 0,
        });
        // done({
        //   url: "https://thumbor.forbes.com/thumbor/fit-in/1200x0/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5d35eacaf1176b0008974b54%2F0x0.jpg%3FcropX1%3D790%26cropX2%3D5350%26cropY1%3D784%26cropY2%3D3349",
        //   progress: 0
        // });
      }
    );
    document.getElementById("btn-export")?.classList.remove("d-none");
    console.log("onReady");
  };

  const handleSendEmail = async () => {
    // @ts-ignore
    emailEditorRef?.current?.editor?.exportHtml(async (data: HtmlExport) => {
      const { design, html } = data;
      console.log("DESIGN ON EXPORT", data.design);
      console.log("export html", html, design);
      const response = await sendEmail(
        {
          to: "receiver@gmail.com",
          from: "sender@gmail.com",
          subject: "FYP-2 Submission",
          htmlContent: html,
        },
        token
      );
      // axios.post(
      //   "http://localhost:3001/api/conversation",
      //   {
      //     to: "receiver@gmail.com",
      //     from: "sender@gmail.com",
      //     subject: "FYP-2 Submission",
      //     htmlContent: html,
      //   }
      // );
      console.log("send mail trap response", response);
    });
  };
  return (
    <>
      {isLoading && (
        <div className="effect-loading">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          {"  "}
          Loading ...
        </div>
      )}
      <div className={isLoading ? "d-none" : "composer-parent"}>
        <FunctionalBar
          exportHtml={exportHtml}
          loadDesign={loadDesign}
          handleSelectChange={handleSelectChange}
          handleSendEmail={handleSendEmail}
        />
        <div className="email-editor">
          <EmailEditor ref={emailEditorRef} onLoad={onLoad} onReady={onReady} />
        </div>
      </div>
    </>
  );
}

export default Composer;
