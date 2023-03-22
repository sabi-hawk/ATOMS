import API from "../index";

type workPayloadType = {
  tags: Array<any>;
  templateId: string;
  emailThreshold: Number | undefined;
  token: string;
};

export async function startSearching({
  tags,
  templateId,
  emailThreshold,
  token,
}: workPayloadType): Promise<any> {
  return API.post(
    "/work",
    {
      tags: tags,
      templateId: templateId,
      emailThreshold: emailThreshold,
    },
    {
      headers: {
        "auth-token": token,
      },
    }
  );
}

export async function checkWorkExists(token: string): Promise<any> {
  return API.get("/work/status", {
    headers: {
      "auth-token": token,
    },
  });
}
