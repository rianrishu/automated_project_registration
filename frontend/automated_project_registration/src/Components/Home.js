import React from 'react'
import {Link,useHistory} from 'react-router-dom'
import '../CSS/Homepage.css'
function Home() {
    let history=useHistory();
 const handleclick=(param)=> {
   console.log(param)
   history.push(`/${param}/login`);
 }
  return (
    <section id="home">
    <ul >
    <li onClick={() => handleclick('admin')}>Admin</li>
    <li onClick={()=>handleclick("faculty")} >Faculty</li>
    <li onClick={() =>handleclick("user")}>User</li>
  </ul>
  </section>
  )
}

export default Home