import MiniContext from "./MiniContext"

import React, { useState } from 'react'

function MiniState(props) {
  const [batch,setbatch]=useState("0")
  return (
    <MiniContext.Provider value={{batch,setbatch}}>
        {props.children}
    </MiniContext.Provider>
  )
}

export default MiniState