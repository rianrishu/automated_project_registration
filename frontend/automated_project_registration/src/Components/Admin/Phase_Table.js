import React from "react";
import { Link } from "react-router-dom";
function Phase_Table(props) {
  let { Batch, Usn, Demo, Work, Prese, Answer, Regular, Total } = props.res;
  console.log(Batch, Usn);
  if (Demo != undefined && Demo === -1) Demo = "Not Set";
  if (Demo != undefined && Work === -1) Work = "Not Set";
  if (Demo != undefined && Prese === -1) Prese = "Not Set";
  if (Demo != undefined && Answer === -1) Answer = "Not Set";
  if (Demo != undefined && Regular === -1) Regular = "Not Set";
  if (Demo != undefined && Total === -1) Total = "Not Set";
  return (
    <>
      <td style={{ border: "1px solid" }}>{Batch}</td>
      <td style={{ border: "1px solid" }}>{Usn}</td>
      <td style={{ border: "1px solid" }}>{Demo}</td>
      <td style={{ border: "1px solid" }}>{Work}</td>
      <td style={{ border: "1px solid" }}>{Prese}</td>
      <td style={{ border: "1px solid" }}>{Answer}</td>
      <td style={{ border: "1px solid" }}>{Regular}</td>
      <td style={{ border: "1px solid" }}>{Total}</td>
    </>
  );
}

export default Phase_Table;
