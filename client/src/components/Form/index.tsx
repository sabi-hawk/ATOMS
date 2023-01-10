import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getEmailRecords } from "../../flux/reducers/scrappedData";
import { setSearchInfo } from "../../flux/reducers/searchData";
import moment from "moment";

function Form({ setFormStatus, setEmailsLoading }: any) {
  const [searchData, setSearchData] = useState({
    query: "",
    noOfPages: "",
    noOfEmails: "",
  });
  const dispatch = useDispatch();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    dispatch(setSearchInfo(searchData));
    setFormStatus(true);

    const start = moment();
    const { data } = await axios.get(
      `http://localhost:3001/api/python?numOfEmails=${searchData.noOfEmails}&numOfPages=${searchData.noOfPages}&search=${searchData.query}`
    );
    const end = moment();
    const duration = end.diff(start, "seconds");
    dispatch(setSearchInfo({...searchData, duration: duration }));

    setEmailsLoading(false);
    dispatch(getEmailRecords(data));
    console.log("Response", data);
  };
  return (
    <form className="demoForm" onSubmit={handleSubmit}>
      <div className="form-outline mb-4 w-100">
        <input
          className="bg-transparent form-control py-2"
          id="query"
          type="text"
          placeholder="Search Query"
          value={searchData.query}
          onChange={(e) =>
            setSearchData({ ...searchData, query: e.target.value })
          }
          required
        />
      </div>

      <div className="form-outline mb-4 w-100">
        <input
          className="bg-transparent form-control py-2"
          id="noOfPages"
          type="text"
          value={searchData.noOfPages}
          placeholder="Pages Threshold"
          onChange={(e) =>
            setSearchData({
              ...searchData,
              noOfPages: e.target.value,
            })
          }
          required
        />
      </div>

      <div className="form-outline mb-4 w-100">
        <input
          className="bg-transparent form-control py-2"
          id="noOfEmails"
          type="text"
          value={searchData.noOfEmails}
          placeholder="Emails Threshold"
          onChange={(e) =>
            setSearchData({
              ...searchData,
              noOfEmails: e.target.value,
            })
          }
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">
        Submit
      </button>
    </form>
  );
}

export default Form;
