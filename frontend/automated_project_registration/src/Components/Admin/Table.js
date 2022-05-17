import React from 'react'

function Table(props) {
  let classs=props.res.class;
    const {name,description,faculty,selected_by}=props.res
    let index=props.index;
    // console.log(marks)
  return (
    <>
        <th  scope="row">{index}</th>
        <th>{name}</th>
        <td>{description}</td>
        <td>{faculty}</td>
        <td>{selected_by}</td>
        </>
  )
}

export default Table