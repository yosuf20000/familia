import React, { useEffect } from 'react'
import axios from 'axios';

function Check() {
    const check = async (e) => {
        e.preventDefault()
        const response = await axios.get('http://localhost:3000/check').then(res => {
            console.log(res);
            
        })

        console.log(response);
        
        
    }
  return (
    <div >
        <button onClick={check}>
            Hi
        </button>
      
    </div>
  )
}

export default Check
