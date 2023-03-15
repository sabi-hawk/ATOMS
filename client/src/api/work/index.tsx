import axios from "axios";
import { API } from "../index";

type workPayloadType = {
  tags: Array<any>;
  templateId: string;
  emailThreshold: Number | undefined;
  token: string;
};
export const startSearching = async ({
  tags,
  templateId,
  emailThreshold,
  token,
}: workPayloadType) =>
  API.post(
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

export const checkWorkExists = (token: string) =>
  API.get("/work/status", {
    headers: {
      "auth-token": token,
    },
  });
