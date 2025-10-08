import React, { useState } from 'react'
import bgImage from '../assets/images/img1.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate();
  const { login, userType } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password); //  use AuthContext login
      // Navigate after context is updated
      if(userType === 'admin'){
        navigate('/dashboard');
      } else {
        navigate('/home');
      }
    } catch (error) {
      alert('Invalid email or password');
    }
  }
  return (
    <>
<div
  style={{ backgroundImage: `url(${bgImage})` }}
  className="bg-cover bg-bottom md:h-screen h-screen"
>
    <div className="absolute md:mt-[250px] mt-[200px] md:ml-[690px] ml-6.5 rounded-2xl  bg-gray-600/30 backdrop-blur-none  md:w-[500px] w-[358px] h-[450px]  ">
        <h1 className="text-4xl text-white font-bold font-serif text-center pt-14">Login</h1>
        <form onSubmit ={handleLogin}>
        <div className="flex font-serif text-white border-red-950 border-3 md:w-[305px] w-[280px] h-12 pt-3 pl-4 mt-12 md:ml-24 ml-10">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 fixed">
              <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
              <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
            </svg>
            
            <input type="email" name="email" id="email" placeholder="Email" className="pb-2 pl-10 outline-none "
            value={email}
            onChange={(e)=>setEmail(e.target.value)} />
        </div>


        <div className="flex font-serif text-white border-red-950 border-3 md:w-[305px] w-[280px] h-12 pt-3 pl-4 mt-10 md:ml-24 ml-10">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 fixed">
              <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
            </svg>
            
            <input type="password" name="password" id="password" placeholder="Password" className="pb-2 pl-10 outline-none border-none" 
            value={password}
            onChange={(e)=>setPassword(e.target.value)}/>
        </div>

        <div className="flex gap-3 pt-6 md:ml-34 ml-16 font-bold font-serif">
          <p>Don't have an account? </p><Link to='/signup' className="text-violet-950">SignUp</Link>
        </div>
        <button type='submit' className=" w-[200px] md:ml-[152px] ml-[74px] mt-4 h-12 border-red-950 border-3 font-bold font-serif text-2xl text-white">Login</button>
        </form>
      </div>
      </div>  
    </>
  )
}

export default Login
