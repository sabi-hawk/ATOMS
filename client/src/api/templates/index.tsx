import API from "../index";

export const getTemplatesNames = (userId: string, token: string) =>
  API.get(`/templates/user/${userId}/names`, {
    headers: {
      "auth-token": token,
    },
  });
export const saveTemplate = (
  userId: string,
  token: string,
  design: any,
  designName: string
) =>
  API.post(
    `/templates/user/${userId}/save/${designName}`,
    {
      design: design,
    },
    {
      headers: {
        "auth-token": token,
      },
    }
  );
export const getDesign = (name: string, token: string) =>
  API.get(`/templates/design?name=${name}`, {
    headers: {
      "auth-token": token,
    },
  });
