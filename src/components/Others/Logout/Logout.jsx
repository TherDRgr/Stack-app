import React from 'react';
import { BsStack } from 'react-icons/bs'

function Logout({handleOpen}) {  
    return (  
    <div className='logout-avatar' onClick={handleOpen}>
        <BsStack size={28}/>
    </div>
  );
}

export default Logout;
