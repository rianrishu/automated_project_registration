import React from 'react'
import {Link} from "react-router-dom"
function AllPhaseTable(props) {
    let {st1,st2,st_lead,batch,phase_detail}=props.res
    let st_lead_Id,st_lead_an,st_lead_qu, st_lead_or,st_lead_ans,st_lead_total
    let st1_Id,st1_an,st1_qu, st1_or,st1_ans,st1_total
    let st2_Id,st2_an,st2_qu, st2_or,st2_ans,st2_total
    if(props.stdent_ph1!==undefined){
    let st_lead_marks_ph1=phase_detail[0]
    let st_1_marks_ph1=props.stdent_ph1[1]
    let st_2_marks_ph1=props.stdent_ph1[2]
    st_lead_Id=st_lead_marks_ph1.Identification;st_lead_an=st_lead_marks_ph1.Analysis; st_lead_or=st_lead_marks_ph1.Originality; st_lead_qu=st_lead_marks_ph1.Quality; st_lead_ans=st_lead_marks_ph1.Answers;st_lead_total=st_lead_marks_ph1.Total
    st1_Id=st_1_marks_ph1.Identification;  st1_an=st_1_marks_ph1.Analysis; st1_or=st_1_marks_ph1.Originality; st1_qu=st_1_marks_ph1.Quality; st1_ans=st_1_marks_ph1.Answers;st1_total=st_1_marks_ph1.Total
    st2_Id=st_2_marks_ph1.Identification;  st2_an=st_2_marks_ph1.Analysis; st2_or=st_2_marks_ph1.Originality; st2_qu=st_2_marks_ph1.Quality; st2_ans=st_2_marks_ph1.Answers;st2_total=st_2_marks_ph1.Total
  }
    if(st_lead_Id!=undefined&&st_lead_Id===-1)
    st_lead_Id="Not Set"
    if(st_lead_Id!=undefined&&st_lead_an===-1)
    st_lead_an="Not Set"
    if(st_lead_Id!=undefined&&st_lead_or===-1)
    st_lead_or="Not Set"
    if(st_lead_Id!=undefined&&st_lead_qu===-1)
    st_lead_qu="Not Set"
    if(st_lead_Id!=undefined&&st_lead_ans===-1)
    st_lead_ans="Not Set"
    if(st_lead_Id!=undefined&&st_lead_total===-1)
    st_lead_total="Not Set"
    if(st_lead_Id!=undefined&&st1_Id===-1)
    st1_Id="Not Set"
    if(st_lead_Id!=undefined&&st1_an===-1)
    st1_an="Not Set"
    if(st_lead_Id!=undefined&&st1_or===-1)
    st1_or="Not Set"
    if(st_lead_Id!=undefined&&st1_qu===-1)
    st1_qu="Not Set"
    if(st_lead_Id!=undefined&&st1_ans===-1)
    st1_ans="Not Set"
    if(st_lead_Id!=undefined&&st1_total===-1)
    st1_total="Not Set"
    if(st_lead_Id!=undefined&&st2_Id===-1)
    st2_Id="Not Set"
    if(st_lead_Id!=undefined&&st2_an===-1)
    st2_an="Not Set"
    if(st_lead_Id!=undefined&&st2_or===-1)
    st2_or="Not Set"
    if(st_lead_Id!=undefined&&st2_qu===-1)
    st2_qu="Not Set"
    if(st_lead_Id!=undefined&&st2_ans===-1)
    st2_ans="Not Set"
    if(st_lead_Id!=undefined&&st2_total===-1)
    st2_total="Not Set"
    
  return (
    <>
        
        <td>{batch}</td>
        <td>
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
        </td>
        <td>
        {(st_lead_Id!=undefined)?
        <tr>
        <tr>
         <td>{st_lead_Id}</td>
         <br/>
         </tr>
         <tr>
         <td>{st1_Id}</td>
         <br/>
         </tr>
         <tr>
         <td>{st2_Id}</td>
         <br/>
         </tr>
         </tr>
        :
        <td></td>} 
        </td>
        <td>
        {(st_lead_Id!=undefined)?
        <tr>
        <tr>
         <td>{st_lead_an}</td>
         <br/>
         </tr>
         <tr>
         <td>{st1_an}</td>
         <br/>
         </tr>
         <tr>
         <td>{st2_an}</td>
         <br/>
         </tr>
         </tr>
        :
        <td></td>} 
        </td>
        <td>
        {(st_lead_Id!=undefined)?
        <tr>
        <tr>
         <td>{st_lead_or}</td>
         <br/>
         </tr>
         <tr>
         <td>{st1_or}</td>
         <br/>
         </tr>
         <tr>
         <td>{st2_or}</td>
         <br/>
         </tr>
         </tr>
        :
        <td></td>} 
        </td>

        <td>
        {(st_lead_Id!=undefined)?
        <tr>
        <tr>
         <td>{st_lead_qu}</td>
         <br/>
         </tr>
         <tr>
         <td>{st1_qu}</td>
         <br/>
         </tr>
         <tr>
         <td>{st2_qu}</td>
         <br/>
         </tr>
         </tr>
        :
        <td></td>} 
        </td>

        <td>
        {(st_lead_Id!=undefined)?
        <tr>
        <tr>
         <td>{st_lead_ans}</td>
         <br/>
         </tr>
         <tr>
         <td>{st1_ans}</td>
         <br/>
         </tr>
         <tr>
         <td>{st2_ans}</td>
         <br/>
         </tr>
         </tr>
        :
        <td></td>} 
        </td>
       
        <td>
        {(st_lead_Id!=undefined)?
        <tr>
        <tr>
         <td>{st_lead_total}</td>
         <br/>
         </tr>
         <tr>
         <td>{st1_total}</td>
         <br/>
         </tr>
         <tr>
         <td>{st2_total}</td>
         <br/>
         </tr>
         </tr>
        :
        <td></td>} 
        </td>

        

        {/* <td>{selected_by}<button className='mx-3'  onClick={()=>{props.updatetopic(index-1,id)}}><img src="https://www.freeiconspng.com/uploads/edit-editor-pen-pencil-write-icon--4.png" height="10px" width="10px"/></button></td> */}
        </>
  )
}

export default AllPhaseTable