import React from 'react'
import LoginForm from '../components/LoginForm'
import Header from '../components/Header'
const Login = () => {
    return (
        <div className='flex flex-col justify-center items-center min-h-screen'>
            <Header />
            <LoginForm />
        </div>
    )
}

export default Login
