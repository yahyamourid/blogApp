import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Categories from '../components/CategoriesList'
import RecentPost from '../components/RecentPost'
const Home = () => {
    return (
        <div className='flex flex-col items-center bg-white'>
            <Header />
            <Hero />
            <Categories />

            <div className="flex flex-col items-start w-4/5 my-7">
                <RecentPost />
            </div>

        </div>
    )
}

export default Home
