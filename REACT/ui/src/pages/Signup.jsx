import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bgImage from "../assets/images/img1.jpg";

const Signup = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(""); 

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Signup Successful");
        navigate("/"); 
      } else {
        setError(data.message || data.error || "Signup failed");
      }
    } catch (err) {
      console.error( err);
      setError("Something went wrong. Please try again.");
    }
  };


  return (
    <>
    <div  style={{ backgroundImage: `url(${bgImage})` }} className="  bg-cover bg-bottom  h-screen  ">
    <div className="absolute mt-[210px] md:ml-[690px] ml-7.5 rounded-2xl  bg-gray-600/30 backdrop-blur-none  md:w-[500px] w-[350px]  h-[500px]  ">
          <h1 className="text-4xl text-white font-bold font-serif text-center pt-10">SignUp</h1>
          {error && <p className='text-red-500 mb-4'>{error}</p>}
          <form onSubmit={handleSignUp}>
          <div className="flex font-serif text-white border-red-950 border-3 w-[305px] h-12 pt-3 pl-4 mt-10 md:ml-24 ml-5.5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 fixed">
                <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
              </svg>
              <input type="text" name="username" id="username"
                autoComplete="username"
                 placeholder="User Name" className="pb-2 pl-10 outline-none border-none "
              value={username}
              onChange={(e)=>setUserName(e.target.value)} />
          </div>

          <div className="flex font-serif text-white border-red-950 border-3 w-[305px] h-12 pt-3 pl-4 mt-10 md:ml-24 ml-5.5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 fixed">
                <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
              </svg>
              
              <input type="email" name="email" id="email" placeholder="Email" className="pb-2 pl-10 outline-none border-none"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              autoComplete="email"
             />
          </div>


          <div className="flex font-serif text-white border-red-950 border-3 w-[305px] h-12 pt-3 pl-4 mt-10 md:ml-24 ml-5.5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 fixed">
                <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
              </svg>
              
              <input type="password" name="password" id="password" placeholder="Password" className="pb-2 pl-10 outline-none border-none"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              autoComplete="new-password"  />
          </div>

          <div className="flex gap-3 pt-6 md:ml-34 ml-14 font-bold font-serif">
            <p>Already have an account? </p><Link to='/' className="text-violet-950">Login</Link>
          </div>
          <button type='submit' className=" w-[200px] md:ml-[152px] ml-18 mt-4 h-12 border-red-950 border-3 font-bold font-serif text-2xl text-white">SignUp</button>
          </form>
        </div>
    </div>
    </>
  )
}

export default Signup
