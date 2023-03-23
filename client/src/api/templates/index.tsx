import API from "../index";

export const getTemplatesNames = (userId: string) =>
  API.get(`/templates/user/${userId}/names`);
export const saveTemplate = (
  userId: string,
  design: any,
  designName: string
) =>
  API.post(
    `/templates/user/${userId}/save/${designName}`,
    {
      design: design,
    }
  );
export const getDesign = (name: string) =>
  API.get(`/templates/design?name=${name}`);
