import MiniContext from "./MiniContext"

import React, { useState } from 'react'

function MiniState(props) {
 
 const [conbch,setconbch]=useState("null")
  return (
    <MiniContext.Provider value={{conbch,setconbch}}>
        {props.children}
    </MiniContext.Provider>
  )
}

export default MiniState