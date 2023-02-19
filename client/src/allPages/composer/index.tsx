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
import { useSelector } from "react-redux";
import { AtomState } from "../../flux/store";

function Composer() {
  const {
    auth: {
      user: { _id, token },
    },
  } = useSelector((state: AtomState) => state);
  const [designNames, setDesignNames] = useState([]);

  const emailEditorRef: any = useRef(null);

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
        console.log('FOUND TEMPLATE NAMES', data.files)
      } catch (err) {
        console.log("Error | Composer | getDesigns", err);
      }
    };
    getTemplateNames();
  }, []);
  const exportHtml = async () => {
    // @ts-ignore
    emailEditorRef?.current?.editor?.exportHtml(async (data: HtmlExport) => {
      const { design, html } = data;
      console.log("DESIGN ON EXPORT", data.design);
      try {
        const { data } = await saveTemplate(_id, token, design);
        console.log("Design Saved", data);
      } catch (err) {
        console.log("Error | Composer | ExportHTML", err);
      }
      // const response = await axios.post(
      //   "http://localhost:3001/api/templates/save",
      //   {
      //     design: design,
      //   }
      // );
      // console.log("export html", html, design);
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

  const sendMail = async () => {
    // @ts-ignore
    emailEditorRef?.current?.editor?.exportHtml(async (data: HtmlExport) => {
      const { design, html } = data;
      console.log("DESIGN ON EXPORT", data.design);
      console.log("export html", html, design);
    });
    const html = "";
    const { data } = await axios.post(
      "http://localhost:3001/api/conversation",
      {
        to: "receiver@gmail.com",
        from: "sender@gmail.com",
        subject: "FYP-2 Submission",
        htmlContent: html,
      }
    );
    console.log("data");
  };
  return (
    <div className="composer-parent">
      <div>
        <button id="btn-export" className="d-none" onClick={exportHtml}>
          Export HTML
        </button>
        <button id="btn-export" className="" onClick={exportHtmlA}>
          Send Mail
        </button>
        <button
          id="btn-export"
          className=""
          onClick={(event) => loadDesign(event, "")}
        >
          Empty Editor
        </button>
        <button
          id="btn-export"
          className=""
          onClick={(event) => loadDesign(event, "default_1")}
        >
          Load Default_1
        </button>
        <select onChange={handleSelectChange}>
          <option value=""> Choose Template</option>
          {designNames.map((name, index) => (
            <option value={name}>{`Design_${index + 1}`} </option>
          ))}
        </select>
      </div>
      <div className="email-editor">
        <EmailEditor ref={emailEditorRef} onLoad={onLoad} onReady={onReady} />
      </div>
    </div>
  );
}

export default Composer;
