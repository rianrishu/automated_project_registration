// import React from 'react'
// import {Link} from "react-router-dom"
// function AllPhaseTable(props) {
//     let {st1,st2,st_lead,batch,phase_detail}=props.res
//     let st_lead_Id,st_lead_an,st_lead_qu, st_lead_or,st_lead_ans,st_lead_total,    st_lead_Id_ph2,st_lead_an_ph2,st_lead_qu_ph2, st_lead_or_ph2,st_lead_ans_ph2,st_lead_total_ph2 ,    st_lead_Id_ph3,st_lead_an_ph3,st_lead_qu_ph3, st_lead_or_ph3,st_lead_ans_ph3,st_lead_total_ph3
//     let st1_Id,st1_an,st1_qu, st1_or,st1_ans,st1_total, st1_Id_ph2,st1_an_ph2,st1_qu_ph2, st1_or_ph2,st1_ans_ph2,st1_total_ph2   ,  st1_Id_ph3,st1_an_ph3,st1_qu_ph3, st1_or_ph3,st1_ans_ph3,st1_total_ph3
//     let st2_Id,st2_an,st2_qu, st2_or,st2_ans,st2_total,           st2_Id_ph2,st2_an_ph2,st2_qu_ph2, st2_or_ph2,st2_ans_ph2,st2_total_ph2  ,     st2_Id_ph3,st2_an_ph3,st2_qu_ph3, st2_or_ph3,st2_ans_ph3,st2_total_ph3  
//     if(props.res.phase_detail!==undefined){
//     let st_lead_marks_ph1=phase_detail[0]
//     let st_1_marks_ph1=phase_detail[1]
//     let st_2_marks_ph1=phase_detail[2]
//     let st_lead_marks_ph2=phase_detail[3]
//     let st_1_marks_ph2=phase_detail[4]
//     let st_2_marks_ph2=phase_detail[5]
//     let st_lead_marks_ph3=phase_detail[6]
//     let st_1_marks_ph3=phase_detail[7]
//     let st_2_marks_ph3=phase_detail[8]
//     //Phase 1
//     if(st_1_marks_ph1!=undefined){
//     st_lead_Id=st_lead_marks_ph1.Identification;st_lead_an=st_lead_marks_ph1.Analysis; st_lead_or=st_lead_marks_ph1.Originality; st_lead_qu=st_lead_marks_ph1.Quality; st_lead_ans=st_lead_marks_ph1.Answers;st_lead_total=st_lead_marks_ph1.Total
//     st1_Id=st_1_marks_ph1.Identification;  st1_an=st_1_marks_ph1.Analysis; st1_or=st_1_marks_ph1.Originality; st1_qu=st_1_marks_ph1.Quality; st1_ans=st_1_marks_ph1.Answers;st1_total=st_1_marks_ph1.Total
//     st2_Id=st_2_marks_ph1.Identification;  st2_an=st_2_marks_ph1.Analysis; st2_or=st_2_marks_ph1.Originality; st2_qu=st_2_marks_ph1.Quality; st2_ans=st_2_marks_ph1.Answers;st2_total=st_2_marks_ph1.Total
//   }
//   //Phase 2
//   if(st_1_marks_ph1!=undefined){
//     st_lead_Id_ph2=st_lead_marks_ph2.Answers;st_lead_an_ph2=st_lead_marks_ph2.Design; st_lead_or_ph2=st_lead_marks_ph2.Effective; st_lead_qu_ph2=st_lead_marks_ph2.Quality; st_lead_ans_ph2=st_lead_marks_ph2.Work;st_lead_total_ph2=st_lead_marks_ph2.Total
//     st1_Id_ph2=st_1_marks_ph2.Answers;  st1_an_ph2=st_1_marks_ph2.Design; st1_or_ph2=st_1_marks_ph2.Effective; st1_qu_ph2=st_1_marks_ph2.Quality; st1_ans_ph2=st_1_marks_ph2.Work;st1_total_ph2=st_1_marks_ph2.Total
//     st2_Id_ph2=st_2_marks_ph2.Answers;  st2_an_ph2=st_2_marks_ph2.Design; st2_or_ph2=st_2_marks_ph2.Effective; st2_qu_ph2=st_2_marks_ph2.Quality; st2_ans_ph2=st_2_marks_ph2.Work;st2_total_ph2=st_2_marks_ph2.Total
//   }

//   //Phase 3
//   if(st_1_marks_ph1!=undefined){
//     st_lead_Id_ph3=st_lead_marks_ph3.Demonstration;st_lead_an_ph3=st_lead_marks_ph3.Answers; st_lead_or_ph3=st_lead_marks_ph3.Presentaion; st_lead_qu_ph3=st_lead_marks_ph3.Regularity; st_lead_ans_ph3=st_lead_marks_ph3.Work;st_lead_total_ph3=st_lead_marks_ph3.Total
//     st1_Id_ph3=st_1_marks_ph3.Demonstration;  st1_an_ph3=st_1_marks_ph3.Answers; st1_or_ph3=st_1_marks_ph3.Presentaion; st1_qu_ph3=st_1_marks_ph3.Regularity; st1_ans_ph3=st_1_marks_ph3.Work;st1_total_ph3=st_1_marks_ph3.Total
//     st2_Id_ph3=st_2_marks_ph3.Demonstration;  st2_an_ph3=st_2_marks_ph3.Answers; st2_or_ph3=st_2_marks_ph3.Presentaion; st2_qu_ph3=st_2_marks_ph3.Regularity; st2_ans_ph3=st_2_marks_ph3.Work;st2_total_ph3=st_2_marks_ph3.Total
//   }
// }
//     if(st_lead_Id!=undefined&&st_lead_Id===-1)
//     st_lead_Id="Not Set"
//     if(st_lead_Id!=undefined&&st_lead_an===-1)
//     st_lead_an="Not Set"
//     if(st_lead_Id!=undefined&&st_lead_or===-1)
//     st_lead_or="Not Set"
//     if(st_lead_Id!=undefined&&st_lead_qu===-1)
//     st_lead_qu="Not Set"
//     if(st_lead_Id!=undefined&&st_lead_ans===-1)
//     st_lead_ans="Not Set"
//     if(st_lead_Id!=undefined&&st_lead_total===-1)
//     st_lead_total="Not Set"
//     if(st_lead_Id!=undefined&&st1_Id===-1)
//     st1_Id="Not Set"
//     if(st_lead_Id!=undefined&&st1_an===-1)
//     st1_an="Not Set"
//     if(st_lead_Id!=undefined&&st1_or===-1)
//     st1_or="Not Set"
//     if(st_lead_Id!=undefined&&st1_qu===-1)
//     st1_qu="Not Set"
//     if(st_lead_Id!=undefined&&st1_ans===-1)
//     st1_ans="Not Set"
//     if(st_lead_Id!=undefined&&st1_total===-1)
//     st1_total="Not Set"
//     if(st_lead_Id!=undefined&&st2_Id===-1)
//     st2_Id="Not Set"
//     if(st_lead_Id!=undefined&&st2_an===-1)
//     st2_an="Not Set"
//     if(st_lead_Id!=undefined&&st2_or===-1)
//     st2_or="Not Set"
//     if(st_lead_Id!=undefined&&st2_qu===-1)
//     st2_qu="Not Set"
//     if(st_lead_Id!=undefined&&st2_ans===-1)
//     st2_ans="Not Set"
//     if(st_lead_Id!=undefined&&st2_total===-1)
//     st2_total="Not Set"
    
//   return (
//     <>
//         <td>{props.index}</td>
//         <td>{batch}</td>
//         <td>
//         {(st_lead!=undefined&&st_lead.length!=0)?
//         <td>{st_lead}Leader</td>
//         :"Not Selected"}
//         </td>
        
        

//         {/* <td>{selected_by}<button className='mx-3'  onClick={()=>{props.updatetopic(index-1,id)}}><img src="https://www.freeiconspng.com/uploads/edit-editor-pen-pencil-write-icon--4.png" height="10px" width="10px"/></button></td> */}
//         </>
//   )
// }

// export default AllPhaseTable