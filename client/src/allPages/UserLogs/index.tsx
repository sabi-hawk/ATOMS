import React, { useEffect } from "react";
import { getUserLogs } from "../../api/work";

function UserLogs() {
  useEffect(() => {
    const getData = async () => {
      const { data } = await getUserLogs();
      console.log("Found Logs", data);
    };
    getData();
  }, []);
  return <div></div>;
}

export default UserLogs;
