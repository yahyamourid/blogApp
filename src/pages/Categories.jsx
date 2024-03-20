import React from 'react'
import CategoriesDetails from '../components/CategoriesDetails'
import Header from '../components/Header'
const Categories = () => {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen'>
            <Header />
            <CategoriesDetails />
        </div>
    )
}

export default Categories
