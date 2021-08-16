import React from 'react'
import { BsGear} from "react-icons/bs";
import { FaTimes} from "react-icons/fa";

const Header = ({setOpen, open}) => {
    return (
        <div className='header'>
            {
                open ? <FaTimes onClick={() => setOpen(false)}/> : <BsGear onClick={() => setOpen(true)}/>
            }
            
        </div>
    )
}

export default Header
