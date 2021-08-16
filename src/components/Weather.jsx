import React, { useState } from 'react'
import Header from './Header'
import Settings from './Settings'

const Weather = () => {
  const [open, setOpen] = useState(false);
    
    return (
        <div className='weather'>
            <Header setOpen={setOpen} open={open}/>
            <Settings setOpen={setOpen} open={open}/>
        </div>
    )
}

export default Weather
