import React, { useEffect, useState } from "react";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import ReactLoading from "react-loading";
import * as legoData from "./legoloading.json";
import * as doneData from "./doneloading.json";
import { useSelector } from "react-redux";

function Lotties({ emailsLoading }: any) {
  const searchInfo = useSelector((state: any) => state.search);
  useEffect(() => {
    console.log("Search Info", searchInfo);
    setTimeout(() => {
      setQueriesLoading(false);
    }, 5000);

    setTimeout(() => {
      setLinksLoading(false);
    }, (searchInfo?.search?.noOfPages * 2.5 * 1000 + 5000));
  },[]);

  const [queriesLoading, setQueriesLoading] = useState(true);
  const [linksLoading, setLinksLoading] = useState(true);
  const options = {
    defaultOptions: {
      loop: true,
      autoplay: true,
      animationData: legoData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    },
    defaultOptions2: {
      loop: false,
      autoplay: true,
      animationData: doneData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    },
  };
  return (
    <div className="lotties text-white w-100 mb-4 d-flex justify-content-around align-items-center">
      <div>
        {queriesLoading ? (
          <FadeIn>
            <div className="d-block justify-content-center align-items-center">
              <Lottie options={options.defaultOptions} height={50} width={50} />
            </div>
          </FadeIn>
        ) : (
          <div className="d-flex justify-content-center align-items-center">
            <Lottie options={options.defaultOptions2} height={50} width={50} />
          </div>
        )}
        <h1 className="d-block w-100">Queries</h1>
      </div>
      <div className={queriesLoading ? "bar" : "greenBars bar"}></div>
      <div>
        {linksLoading ? (
          <FadeIn>
            <div className="d-flex justify-content-center align-items-center">
              <Lottie options={options.defaultOptions} height={50} width={50} />
            </div>
          </FadeIn>
        ) : (
          <div className="d-flex justify-content-center align-items-center">
            <Lottie options={options.defaultOptions2} height={50} width={50} />
          </div>
        )}
        <h1> Links</h1>
      </div>
      <div className={linksLoading ? "bar" : "greenBars bar"}></div>
      <div>
        {emailsLoading ? (
          <FadeIn>
            <div className="d-flex justify-content-center align-items-center">
              <Lottie options={options.defaultOptions} height={50} width={50} />
            </div>
          </FadeIn>
        ) : (
          <div className="d-flex justify-content-center align-items-center">
            <Lottie options={options.defaultOptions2} height={50} width={50} />
          </div>
        )}
        <h1> Emails</h1>
      </div>
    </div>
  );
}

export default Lotties;
