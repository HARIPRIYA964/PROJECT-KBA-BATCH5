import React from 'react'
import bgImage from '../assets/images/img12.jpg'
import image1 from '../assets/images/image4.png'

const Dashboard = () => {
  return (
    <div
      className="h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-gray-700/70 w-full h-full flex flex-col items-center justify-center">
        <h1 className="font-bold font-serif text-5xl tracking-[5px] text-white mb-5">
          Welcome To Dashboard
        </h1>
        <img src={image1} alt="" className="w-[400px]" />
      </div>
    </div>
  )
}

export default Dashboard
