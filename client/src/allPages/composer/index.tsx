import axios from "axios";
import React, { useRef } from "react";
import EmailEditor, {
  FileInfo,
  FileUploadDoneCallback,
  HtmlExport,
  HtmlOptions,
} from "react-email-editor";
import fs from "fs";

function Composer() {
  const emailEditorRef = useRef(null);

  const exportHtml = async () => {
    // @ts-ignore
    emailEditorRef?.current?.editor?.exportHtml(async (data: HtmlExport) => {
      const { design, html } = data;
      console.log("DESIGN ON EXPORT", data.design);
      const response = await axios.post(
        "http://localhost:3001/api/templates/save",
        {
          design: design,
        }
      );
      // fs.writeFile("./design.json", JSON.stringify(design), (err) => {
      //   console.log("Error writing design JSON", err);
      // });
      console.log("export html", html, design);
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
      console.log("data", response.data)
    });
    
  };
  const onLoad = async () => {
    const { data } = await axios.get(
      "http://localhost:3001/api/templates/design"
    );
    console.log("DESIGN ON LOAD", data.design);
    // @ts-ignore
    emailEditorRef.current.editor.loadDesign(data.design);
    // fs.readFile("./design.json", "utf-8", (err, jsonString) => {
    //   if (err) {
    //     console.log("Error reading jsonDesign", err);
    //     return;
    //   }
    //   try {
    //     const jsonDesign = JSON.parse(jsonString);
    //     //@ts-ignore
    //     emailEditorRef.current.editor.loadDesign(jsonDesign);
    //   } catch (err) {
    //     console.log("Error parsing JSON string:", err);
    //   }
    // });

    // editor instance is created
    // you can load your template here;
    // const templateJson = {};
    // emailEditorRef.current.editor.loadDesign(templateJson);
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
  // const saveDesign = () => {
  //   emailEditorRef.current.editor.saveDesign((design) => {});
  // };
  const sendMail = async () => {
    // @ts-ignore
    // @ts-ignore
    emailEditorRef?.current?.editor?.exportHtml(async (data: HtmlExport) => {
      const { design, html } = data;
      console.log("DESIGN ON EXPORT", data.design);
      console.log("export html", html, design);
    });
    const html = "";
    // const html: string = emailEditorRef?.current?.editor?.exportHtml(
    //   async (data: HtmlExport) => {
    //     return data.html;
    //   }
    // );
    const { data } = await axios.post(
      "http://localhost:3001/api/conversation",
      {
        to: "receiver@gmail.com",
        from: "sender@gmail.com",
        subject: "FYP-2 Submission",
        htmlContent: html,
      }
    );
    console.log("data")
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
      </div>
      <div className="email-editor">
        <EmailEditor ref={emailEditorRef} onLoad={onLoad} onReady={onReady} />
      </div>
    </div>
  );
}

export default Composer;
