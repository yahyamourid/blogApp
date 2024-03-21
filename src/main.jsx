import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import Categories from "./pages/Categories";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
// import AdminHome from './components/admin/AdminHome';
// import ProfHome from './components/prof/ProfHome';
// import Login from './components/auth/Login';
// import Register from './components/auth/Register';
// import NotFound404 from './components/auth/NotFound404'
// import ResetPwd from "./components/auth/ResetPwd";
// import VerifyCode from "./components/auth/VerifyCode";
// import CodeActivation from "./components/auth/CodeActivation";

// const userlogin = JSON.parse(localStorage.getItem("userlogin"))
// const email = JSON.parse(localStorage.getItem("email"))
// const code = JSON.parse(localStorage.getItem("code"))
// let role
// if (userlogin !== null){
//   role = userlogin.role
// }

const etat = localStorage.getItem("etat")

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>

      <Routes>
        {/* {userlogin ? (
          <>
            {role === 'admin' && <Route path='/admin' element={<AdminHome />} />}
            {role === 'professor' && <Route path='/professor/:componentName' element={<ProfHome />} />}
            {role === 'professor' && <Route path='/professor' element={<Navigate replace to={`/${role}/dashboard`} />} />}
            {!(role === 'admin') && <Route path='/admin' element={<Navigate replace to={`/${role}`} />} />}
            {!(role === 'professor') && <Route path='/professor' element={<Navigate replace to={`/${role}`} />} />}
            <Route path='/login' element={<Navigate replace to={`/${role}`} />} />
            <Route path='/login/*' element={<Navigate replace to={`/${role}`} />} />
            <Route path='/register' element={<Navigate replace to={`/${role}`} />} />
            <Route path='/' element={<Navigate replace to={`/${role}`} />} />
            
          </>
        ) : (
          <>
            <Route path='/admin' element={<Navigate replace to="/login" />} />
            <Route path='/professor/:componentName' element={<Navigate replace to="/login" />} />
            <Route path='/student' element={<Navigate replace to="/login" />} />
          </>
        )}

        {!userlogin && <Route path="/login" element={<Login />} />}
        {!userlogin && <Route path="/login/activationcode" element={<CodeActivation />} />}
        {(!userlogin && email) && <Route path="/login/verifycode" element={<VerifyCode />} />}
        {!userlogin && code && <Route path="/login/resetpwd" element={<ResetPwd />} />}
        {!userlogin && <Route path="/register" element={<Register />} />}
        <Route path="/" element={<Login />} />
        <Route path="*" element={<NotFound404 />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/posts/:postId" element={<Posts />} />
        <Route path="/categories/:categoryId" element={<Categories />} />
        {etat ?
          <>
            <Route path="/login" element={<Navigate replace to="/" />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/posts" element={<Admin content="posts"/>} />
            <Route path="/admin/categories" element={<Admin content="categories" />} />
          </>
          : <>
            <Route path="/login" element={<Login/>} />
            <Route path="/admin" element={<Navigate replace to="/login" />} />
            <Route path="/admin/*" element={<Navigate replace to="/login" />}/>
          </>
        }
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
