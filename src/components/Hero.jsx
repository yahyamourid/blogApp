import React from 'react'
import Herosvg from '../assets/herosvg'
import hero from '../assets/hero.png'
const Hero = () => {
    return (
        <div className='flex items-center justify-center min-h-screen  max-h-screen w-full'>
            <div className="w-2/5 ">
                <p className='text-3xl font-extrabold my-2 '>Bienvenue sur <span className='tracking-widest'>BLOGIFY</span></p>
                <p className='text-base tracking-wide'>Découvrez un monde d'inspiration et de savoir-faire à travers nos blogs variés.
                    Quel que soit votre intérêt, que ce soit pour les dernières actualités, les sports,
                    le codage, le design ou l'éducation, Blogify vous propose une multitude d'articles captivants.
                </p>
            </div>
            <div className="flex items-center justify-center w-2/5 animate-spin0">
                <img src={hero}/>
            </div>
            

        </div>
    )
}

export default Hero
