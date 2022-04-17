import React from 'react'
import {Link} from 'react-router-dom'
function Home() {
    
  return (
    <div className=" d-flex justify-content-center align-items-center container-fluid vh-100">
    <Link className="btn btn-primary mx-5" to="/admin/login">Admin</Link>
    <Link className="btn btn-primary mx-5" to ="/faculty/login" role="button">Faculty</Link>
    <Link className="btn btn-primary mx-5" to ="/user/login" role="button">User</Link>
  </div>
  )
}

export default Home