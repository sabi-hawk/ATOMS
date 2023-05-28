import API from "../index";

type workPayloadType = {
  tags: Array<any>;
  templateId: string;
  emailThreshold: Number | undefined;
};

export async function startSearching({
  tags,
  templateId,
  emailThreshold,
}: workPayloadType): Promise<any> {
  return API.post("/work", {
    tags: tags,
    templateId: templateId,
    emailThreshold: emailThreshold,
  });
}

export async function checkWorkExists(): Promise<any> {
  return API.get("/work/status");
}

export async function sendEmails(subject: string): Promise<any> {
  return API.post("/work/send/emails", { subject });
}
export async function sendEmailsModifies(formData: any): Promise<any> {
  return API.post("/work/send/emails", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
export async function getWorkStatistics(): Promise<any> {
  return API.get("/work/get_WorkStatistics");
}

export async function getUserLogs(): Promise<any> {
  return API.get("/work/logs");
}
