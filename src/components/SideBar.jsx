import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNewspaper, faList ,faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons'

const SideBar = () => {
    const logout = () => {
        localStorage.removeItem("etat")
        window.location = '/'
    }
    return (
        <div className='flex flex-col items-center fixed  h-screen justify-between w-1/12 px-20 bg-black shadow-lg'>
        <a href='/' className='text-2xl text-white font-extrabold tracking-wider mt-10 mb-20'>Blogify</a>
        <div className="flex flex-col w-full justify-center items-center mb-32 gap-4 font-medium tracking-wider">
            <a href='/admin/posts' className='flex justify-center text-white items-center gap-2 p-2 rounded-lg hover:bg-white hover:text-black cursor-pointer'>
                <FontAwesomeIcon icon={faNewspaper} />
                <p>Aricles</p>
            </a>
            <a href='/admin/categories' className='flex justify-center text-white items-center gap-2 p-2 rounded-lg hover:bg-white hover:text-black cursor-pointer'>
                <FontAwesomeIcon icon={faList} />
                <p>Categories</p>
            </a>
        </div>
        <FontAwesomeIcon icon={faArrowRightFromBracket} className='text-gray-700 mx-2 mb-5 cursor-pointer hover:text-white h-6 w-6 hover:scale-105' onClick={()=>logout()}/>
    </div>
    
    )
}

export default SideBar
