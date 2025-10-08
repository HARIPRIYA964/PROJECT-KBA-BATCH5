import React from 'react'
import { Link,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import myImage from '../assets/images/image.png';
import profile from   '../assets/images/profile.jpeg';

const Navbar = () => {
    const {  logout } = useAuth();
    const navigate = useNavigate();
  
    const onLogout = async () => {
      try {
        await logout();                         // clears cookie + state
        toast.success("Logged out");
        navigate("/login", { replace: true });  // prevent Back from reviving
      } catch {
        toast.error("Logout failed");
      }
    };
  
  return (
    
       <div className="w-full bg-white flex fixed">
        <img src={myImage} alt="" className="md:size-36 size-22 mt-[-10px] md:ml-10" />
       <div className="md:mt-16 mt-10  font-serif md:ml-[1000px] ml-[-10px] md:text-xl text-sm ">
        <Link to="/home">Home</Link>
        <Link to='/about' className="md:pl-12 pl-2">About Us</Link>
        <Link to='/bookonline' className="md:pl-12 pl-2">Book Online</Link>
        <button onClick={onLogout} className="md:pl-12 pl-2">Logout</button>
         <Link to="/profile">  <img src={profile} alt=""  className='rounded-full size-18 ml-[530px] mt-[-55px]'/></Link>
    
  
     </div>
     </div>
   
  )
}

export default Navbar
