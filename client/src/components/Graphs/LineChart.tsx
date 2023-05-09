import { useQuery } from "react-query";
import { Line } from "@ant-design/charts";
import { useState } from "react";
import { getWorkStatistics } from "../../api/work";

interface Work_Statistics_Type {
  date: string;
  count: number;
}
const EmailChart = () => {
  const [graphData, setGraphData] = useState<Work_Statistics_Type[]>([]);

  const { isLoading, error, data } = useQuery("emailData", async () => {
    const { data } = await getWorkStatistics();
    setGraphData(data);
  });

  const config = {
    data: graphData,
    xField: "date",
    yField: "mails",
    seriesField: "",
    height: 400,
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return <Line {...config} />;
};

export default EmailChart;
