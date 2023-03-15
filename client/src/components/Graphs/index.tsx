import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Column } from "@ant-design/plots";
import { useSelector } from "react-redux";

const Graph = () => {
  const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  let listOfObjects: any = [];

  useEffect(() => {
    const generateDummyData = () => {
      for (let i = 0; i < 20; i++) {
        listOfObjects.push({
          noOfPages: getRandomNumber(3, 6),
          noOfMails: getRandomNumber(15, 30),
          ResponseTime: getRandomNumber(100, 200),
        });
      }
    };
    if (listOfObjects?.length === 0) generateDummyData();
  }, []);

  const searchInfo = useSelector((state: any) => state.search);
  const data = [
    {
      noOfPages: 5,
      noOfMails: 25,
      ResponseTime: 140,
    },
    {
      noOfPages: "3",
      noOfMails: 30,
      ResponseTime: 120,
    },
    {
      noOfPages: "4",
      noOfMails: 30,
      ResponseTime: 180,
    },
    {
      noOfPages: "3",
      noOfMails: 50,
      ResponseTime: 150,
    },
    {
      noOfPages: "4",
      noOfMails: 50,
      ResponseTime: 250,
    },
  ];
  const config = {
    data,
    isGroup: true,
    xField: "noOfMails",
    yField: "ResponseTime",
    seriesField: "noOfPages",

    label: {
      position: "middle",
      layout: [
        {
          type: "interval-adjust-position",
        },
        {
          type: "interval-hide-overlap",
        },
        {
          type: "adjust-color",
        },
      ],
    },
  };
  //   @ts-ignore
  return <Column {...config} />;
};

export default Graph;
// ReactDOM.render(<DemoColumn />, document.getElementById('container'));

// {
//   noOfPages: searchInfo.search.noOfPages.toString(),
//   noOfMails: searchInfo.search.noOfEmails,
//   ResponseTime: searchInfo.search.duration
// },
