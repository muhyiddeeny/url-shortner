import React, { useState } from 'react'

function InputShortner({setInputValue}) {
  const[value, setValue] = useState("");
  const handleClick = () =>{
     setInputValue(value);
     setValue("");
  }
  return (
    <div className='input-shoetner'>
        <h1>URL <span>Shortner</span></h1>
        <div>
            <input 
            type='text' 
            placeholder='paste a link to shorten it'
            value={value}
            onChange={(e)=> setValue(e.target.value)}
            />
            <button onClick={handleClick}>Shorten</button>
        </div>
        
    </div>
  )
}

export default InputShortner