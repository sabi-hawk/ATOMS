import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Column } from '@ant-design/plots';
import { useSelector } from 'react-redux';

const Graph = () => {
  const searchInfo = useSelector((state: any) => state.search);
  const data = [
    {
      noOfPages: searchInfo.search.noOfPages.toString(),
      noOfMails: searchInfo.search.noOfEmails,
      ResponseTime: searchInfo.search.duration
    },
    {
      noOfPages: '3',
      noOfMails: 30,
      ResponseTime: 120
    },
    {
      noOfPages: '4',
      noOfMails: 30,
      ResponseTime: 180
    },
    {
      noOfPages: '3',
      noOfMails: 50,
      ResponseTime: 150
    },
    {
      noOfPages: '4',
      noOfMails: 50,
      ResponseTime: 250
    }
  ];
  const config = {
    data,
    isGroup: true,
    xField: 'noOfMails',
    yField: 'ResponseTime',
    seriesField: 'noOfPages',

    label: {
      position: 'middle',
      layout: [
        {
          type: 'interval-adjust-position',
        },
        {
          type: 'interval-hide-overlap',
        },
        {
          type: 'adjust-color',
        },
      ],
    },
  };
//   @ts-ignore
  return <Column {...config} />;
};

export default Graph;
// ReactDOM.render(<DemoColumn />, document.getElementById('container'));
