import axios from "axios";

const url = "http://localhost:3001/api/python";

export const extractEmails = async (params: String, query: any) =>
  await axios.get(`${url}${params}`, query);

