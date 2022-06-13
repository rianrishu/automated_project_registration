import React from 'react'
import {Link} from "react-router-dom"
function Table(props) {
    let {name,st1,st2,st_lead,id,batch,st_1_ph1,st_1_ph2,st_1_ph3,st_2_ph1,st_2_ph2,st_2_ph3,st_lead_ph1,st_lead_ph2,st_lead_ph3}=props.res
    let index=props.index;
    if(st_1_ph1!=undefined&&st_1_ph1===-1)
    st_1_ph1="Not Set"
    if(st_1_ph1!=undefined&&st_1_ph2===-1)
    st_1_ph2="Not Set"
    if(st_1_ph1!=undefined&&st_1_ph3===-1)
    st_1_ph3="Not Set"
    if(st_2_ph1!=undefined&&st_2_ph1===-1)
    st_2_ph1="Not Set"
    if(st_2_ph1!=undefined&&st_2_ph2===-1)
    st_2_ph2="Not Set"
    if(st_2_ph1!=undefined&&st_2_ph3===-1)
    st_2_ph3="Not Set"
    if(st_lead_ph1!=undefined&&st_lead_ph1===-1)
    st_lead_ph1="Not Set"
    if(st_lead_ph1!=undefined&&st_lead_ph2===-1)
    st_lead_ph2="Not Set"
    if(st_lead_ph1!=undefined&&st_lead_ph3===-1)
    st_lead_ph3="Not Set"
  return (
    <>
        <th  scope="row">{index}</th>
        <td>{batch}</td>
        {(st_lead!=undefined&&st_lead.length!=0)?
        <tr>
          <tr>
        <td>{st_lead}(Leader)</td>
        </tr>
        <tr>
        <td>{st1}</td>
        </tr>
        <tr>
        <td>{st2}</td>
        </tr>
        </tr>:"Not Selected"}
        <td>{name}</td>
        <td>
        {(st_lead!=undefined&&st_lead.length!=0)?
        <tr>
        <tr>
         <td>{st_lead_ph1}</td>
         <br/>
         </tr>
         <tr>
         <td>{st_1_ph1}</td>
         <br/>
         </tr>
         <tr>
         <td>{st_2_ph1}</td>
         <br/>
         </tr>
         </tr>
        :
        <td></td>} 
        </td>
        <td>
         {(st_lead!=undefined&&st_lead.length!=0)?
        <tr>
        <tr>
         <td>{st_lead_ph2}</td>
         </tr>
         <tr>
         <td>{st_1_ph2}</td>
         </tr>
         <tr>
         <td>{st_2_ph2}</td>
         </tr>
         </tr>
        :
        <td></td>} 
        </td>
        <td>
         {(st_lead!=undefined&&st_lead.length!=0)?
        <tr>
        <tr>
         <td>{st_lead_ph3}</td>
         </tr>
         <tr>
         <td>{st_1_ph3}</td>
         </tr>
         <tr>
         <td>{st_2_ph3}</td>
         </tr>
         </tr>
        :
        <td></td>}  
          </td>
        <td>
         {(st_lead!=undefined&&st_lead.length!=0)?
        <tr>
        <tr>
         <td><Link className="nav-link active"
                to={{
                  pathname: "/faculty/phase1",
                  state: {details:props.res },
                }}>Set Phase 1</Link></td>
         </tr>
         <tr>
         <td><Link className="nav-link active"
                to={{
                  pathname: "/faculty/phase2",
                  state: { topic_id:id,batch:batch },
                }}>Set Phase 2</Link></td>
         </tr>
         <tr>
         <td><Link className="nav-link active"
                to={{
                  pathname: "/faculty/phase3",
                  state: { topic_id:id,batch:batch },
                }}>Set Phase 3</Link></td>
         </tr>
         </tr>
        :
        <td></td>} 
        </td> 
        {/* <td>{selected_by}<button className='mx-3'  onClick={()=>{props.updatetopic(index-1,id)}}><img src="https://www.freeiconspng.com/uploads/edit-editor-pen-pencil-write-icon--4.png" height="10px" width="10px"/></button></td> */}
        </>
  )
}

export default Table