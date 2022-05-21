import MiniContext from "./MiniContext"

import React, { useState } from 'react'

function MiniState(props) {
 const [results,setresults]=useState([]);
  return (
    <MiniContext.Provider value={{results,setresults}}>
        {props.children}
    </MiniContext.Provider>
  )
}

export default MiniState