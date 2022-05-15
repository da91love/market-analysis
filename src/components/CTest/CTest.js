
import React, { useState } from 'react';
import Child from './Child';  // Child Component
  
function CTest() {
  const [Count,setCount]=useState(0);
  console.log("Parent rendered");
  return (
    <div className="wrap">
      <button onClick={()=>setCount(Count+1)}>
        Increase
      </button>
        
      <p>Count:{Count}</p>
  
      <Child name={Count}/>
    </div>
  );
}
  
export default CTest;