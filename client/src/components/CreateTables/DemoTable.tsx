import React from "react";
import { useSelector } from "react-redux";
import { AtomState } from "../../flux/store";

function DemoTable() {
  const scrappedData = useSelector((state: AtomState) => state.scrappedData);
  return (
    <div className="table-main w-100">
      <table className="table table-bordered bg-white position-relative w-100 mb-0">
        <thead className="thead-dark position-absolute top-0 w-100">
          <tr>
            <th scope="col">#</th>
            <th scope="col">URL</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody className="tbody">
          {/* <tr>
            <th scope="row">index</th>
            <td>obj.url</td>
            <td>obj.email</td>
          </tr>
          <tr>
            <th scope="row">index</th>
            <td>obj.url</td>
            <td>obj.email</td>
          </tr>
          <tr>
            <th scope="row">index</th>
            <td>obj.url</td>
            <td>obj.email</td>
          </tr>
          <tr>
            <th scope="row">index</th>
            <td>obj.url</td>
            <td>obj.email</td>
          </tr>
          <tr>
            <th scope="row">index</th>
            <td>obj.url</td>
            <td>obj.email</td>
          </tr>
          <tr>
            <th scope="row">index</th>
            <td>obj.url</td>
            <td>obj.email</td>
          </tr>
          <tr>
            <th scope="row">index</th>
            <td>obj.url</td>
            <td>obj.email</td>
          </tr>
          <tr>
            <th scope="row">index</th>
            <td>obj.url</td>
            <td>obj.email</td>
          </tr>
          <tr>
            <th scope="row">index</th>
            <td>obj.url</td>
            <td>obj.email</td>
          </tr> */}

          {/* @ts-ignore */}
          {scrappedData?.emailRecords?.data.map((obj: any, index: Number) => {
            return (
              <tr key={index.toString()}>
                <th scope="row">{index.toString()}</th>
                <td>{obj.url}</td>
                <td>{obj.email}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DemoTable;
