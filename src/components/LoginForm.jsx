import React, { useState } from 'react';
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const override = css`
  display: block;
  margin: 0 auto;
`;

const LoginForm = () => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simuler un processus de connexion avec une requête asynchrone (par exemple, une requête API)
        setTimeout(() => {
            if (user.email === "admin@gmail.com" && user.password === "12345") {
                toast.success("Connexion réussie !");
                setTimeout(()=>{
                    localStorage.setItem("etat","loggedIn")
                    window.location = '/'
                },800)
                
            } else {
                toast.error("Email ou mot de passe incorrect !");
            }
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="mt-12 w-1/3 flex-col h-3/5 bg-white border border-opacity-20 pb-7 border-gray-500 rounded-lg flex items-center justify-start shadow-xl">
            <span className='mb-10 text-2xl font-bold tracking-wide bg-gray-50 rounded-t-lg  bg-opacity-10 text-center w-full text-black border-b border-opacity-10 border-b-violet-600 py-3'>
                Login Form
            </span>
            <form onSubmit={handleSubmit} className="w-full flex flex-col justify-center items-center">
                <div className="mb-4 w-3/5">
                    <label htmlFor="email" className="flex flex-col text-sm text-black mb-1 font-medium tracking-wider">Email</label>
                    <input id="email" type="email" placeholder="Entrer l'email" autoComplete="" value={user.email} onChange={handleChange}
                        className="text-black font-normal w-full text-sm bg-white border border-opacity-20 border-gray-500 hover:bg-gray-300 rounded-lg px-4 py-2 duration-300 focus:outline-none focus:border-opacity-35 focus:bg-gray-300" />
                </div>
                <div className="mb-4 w-3/5">
                    <label htmlFor="password" className="flex flex-col text-sm text-black mb-1 font-medium tracking-wider">Mot de passe</label>
                    <input id="password" type="password" value={user.password} onChange={handleChange} placeholder='Entrer le mot de passe'
                        className="text-black font-normal w-full text-sm bg-white border border-opacity-20 border-gray-500 hover:bg-gray-300 rounded-lg px-4 py-2 duration-300 focus:outline-none focus:border-opacity-35 focus:bg-gray-300" />
                </div>
                <button type="submit" className={`mt-3 w-3/5 ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-black hover:bg-gray-800'} text-white tracking-widest border border-opacity-20 border-gray-500 rounded-lg px-4 py-1.5 duration-300`} disabled={loading}>
                    {loading ? <ClipLoader color={"#ffffff"} loading={loading} css={override} size={20} /> : "Login"}
                </button>
            </form>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}

export default LoginForm;
