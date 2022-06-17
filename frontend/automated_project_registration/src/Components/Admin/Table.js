import React from "react";

function Table(props) {
  const { name, description, faculty, selected_by, id } = props.res;
  let index = props.index;
  // console.log(marks)
  return (
    <>
      <th scope="row">{index}</th>
      <th style={{ "text-align": "left" }}>{name}</th>
      <td style={{ "text-align": "justify" }}>{description}</td>
      <td>{faculty}</td>
      <td>
        {selected_by}
        <button
          className="mx-3"
          onClick={() => {
            props.updatetopic(index - 1, id);
          }}
        >
          <img
            src="https://www.freeiconspng.com/uploads/edit-editor-pen-pencil-write-icon--4.png"
            height="10px"
            width="10px"
          />
        </button>
      </td>
    </>
  );
}

export default Table;
