import API from "../index";

type workPayloadType = {
  tags: Array<any>;
  templateId: string;
  emailThreshold: Number | undefined;
};

export async function startSearching({
  tags,
  templateId,
  emailThreshold
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
