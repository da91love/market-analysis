
import React from 'react';

function Child(props){
    console.log("Child Rendered");
    return(
        <div>
            <h1>Child Name={props.name}</h1>
        </div>
    );
}
  
export default React.memo(Child);