import React from 'react'
import bgImage from '../assets/images/img4.png'
import image1 from '../assets/images/image1.png'
import image2 from '../assets/images/image2.png'
import image3 from '../assets/images/image3.png'
import bgImage2 from '../assets/images/img2.jpg'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'



const HomePage = () => {
  return (
    <>
      <div className="h-[966px]  md:bg-cover bg-center grid items-center justify-center text-center"
            style={{ backgroundImage: `url(${bgImage})` }}
>
        <div>
          <h1
            className="md:text-7xl text-3xl font-bold pt-54"
            style={{ fontFamily: "'Times New Roman', Times, serif" }}
          >
            WanderGrid Travel <br /> Adventure
          </h1>
        </div>

        <div className="md:mt-[-320px] mt-[-380px] md:text-3xl text-2xl font-serif text-white">
          <p>Explore. Dream. Discover.</p>
        </div>

        <div className="border-4 md:mt-[-570px] mt-[-700px] w-[200px] h-12 pt-2 md:ml-[200px] ml-[40px] border-white text-xl font-bold text-white">
          <Link to='/bookonline'>Let's Go</Link>
        </div>
      </div>

      <div className="md:h-[500px] h-[350px] text-center bg-[#F2F1EC]">
        <h1 className="text-4xl font-bold font-serif md:pt-20 pt-10">This is Our Story</h1>
        <p className="md:pl-[600px] pl-[40px] md:pr-[600px] pr-14 md:pt-10 pt-3">
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Amet consectetur adipiscing elit quisque faucibus ex sapien. Quisque faucibus ex sapien vitae pellentesque sem placerat. Vitae pellentesque sem placerat in id cursus mi.
        </p>
        <div className="border-4 w-[140px] h-10 md:ml-[900px] ml-32 pt-1 mt-5">
          <Link to='/about'>Read More</Link>
        </div>
      </div>

      <div className="md:h-[600px] h-[350px]">
        <h1 className="md:text-4xl text-2xl font-serif font-bold text-center md:pt-32 pt-10">What Makes Us Special</h1>
        <div className="flex md:ml-[450px] md:gap-[300px] mt-10">
          <div className="md:mt-[-20px]">
            <img src={image1} alt="" />
          </div>
          <img src={image2}alt="" />
          <img src={image3} alt="" />
        </div>

        <div className="flex md:text-2xl text-[10px] md:ml-[415px] ml-4 font-bold">
          <h2>Local Expert Guides</h2>
          <h2 className="md:pl-[200px] pl-6">Handpicked Adventures</h2>
          <h2 className="md:pl-[156px] pl-4">Hidden Gem Destinations</h2>
        </div>

        <div className="grid grid-cols-3">
          <p className="md:pl-[420px] md:text-lg text-[9px] text-center pt-2 font-serif">Lorem ipsum dolor sit amet consectetur elit.</p>
          <p className="md:pl-[223px] md:pr-[180px] pr-[20px] md:text-lg text-[9px] text-center pt-2 font-serif">Lorem ipsum dolor sit amet consectetur elit.</p>
          <p className="md:mr-[330px] mr-[20px] md:text-lg text-[9px] text-center pt-2 font-serif">Lorem ipsum dolor sit amet<br /> consectetur elit.</p>
        </div>
      </div>

      <div className="w-full h-[500px] bg-cover bg-center mb-10 text-center"
            style={{ backgroundImage: `url(${bgImage2})` }}
>
        <h1 className="text-6xl pt-28 font-serif text-white">“Not all those who wander <br /> are lost.”</h1>
        <p className="pr-10 pt-3 text-gray-500">J.R.R. Tolkien</p>
      </div>


  <Footer />
    </>
  )
}

export default HomePage
