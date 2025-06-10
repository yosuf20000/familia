import React from 'react'
import logoImg from '../../src/assets/logo.png'
function logo() {
    return (
        <div className="flex h-16 shrink-0 items-center justify-between ">
            <img
                alt="Your Company"
                src={logoImg}
                className=" w-auto mt-3"
            />
            {/* <h1 className='text-xl text-sky-950 font-bold'>غرض العايلة</h1> */}
        </div>
    )
}

export default logo
