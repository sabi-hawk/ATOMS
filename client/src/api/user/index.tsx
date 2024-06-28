import API from "../index";

export const getUser = async (id: string) =>
  API.get(`/user/${id}`);

export async function saveUserTags(tags: any): Promise<any> {
  return API.post("/user/tags", { tags });
}