import React from 'react'
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
const Header = () => {
    const [loggedIn, setLoggedIn] = useState(false)

    const checkConnexion = () => {
        const etat = localStorage.getItem("etat")
        if (etat == 'loggedIn')
            setLoggedIn(true)
    }
    const logout = () => {
        localStorage.removeItem("etat")
        window.location = '/'
    }

    useEffect(() => {
        checkConnexion()
    }, [])
    return (

        <div className='w-5/6 border border-opacity-20 border-gray-500 flex items-center justify-between z-50 top-0 fixed bg-white bg-opacity-80 shadow-md shrink py-4 px-2 mt-5 rounded-3xl'>
            <span className='w-1/6 text-center'>
                <a href='/' className='text-xl font-extrabold tracking-wider '>Blogify</a>
            </span>
            <span className='flex justify-center gap-16  w-4/6 '>
                <a href='/' className='text-sm font-medium tracking-wider hover:text-gray-400'>Home</a>
                <a href='/#' className='text-sm font-medium tracking-wider hover:text-gray-400'>About</a>
                <a href='/#' className='text-sm font-medium tracking-wider hover:text-gray-400'>Contact</a>
            </span>
            {!loggedIn ?
                <span className='w-1/6 text-center'>
                    <a href='/login' className='text-base text-white font-normal px-7 py-1 tracking-wider bg-black rounded-3xl hover:bg-opacity-80 '>login</a>
                </span>
                :
                    <span className='w-1/6 text-center'>
                        <a href='/admin' className='text-base text-white font-normal px-7 py-1 tracking-wider bg-black rounded-3xl hover:bg-opacity-80 '>Dashboard</a>
                    </span>
}     
            
            <span className='flex items-center justify-center gap-4 w-1/6  '>
                <a href=''>
                    <FontAwesomeIcon icon={faInstagram} className='hover:text-red-500' />
                </a>
                <a href=''>
                    <FontAwesomeIcon icon={faTwitter} className='hover:text-sky-400' />
                </a>
                <a href=''>
                    <FontAwesomeIcon icon={faFacebook} className='hover:text-blue-500' />
                </a>
            </span>
            {loggedIn && <FontAwesomeIcon icon={faArrowRightFromBracket} className='text-red-500 mx-2 cursor-pointer hover:text-red-700 hover:scale-105' onClick={()=>logout()}/>}

        </div>

    )
}

export default Header
