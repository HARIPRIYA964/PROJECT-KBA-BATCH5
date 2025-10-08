import React from 'react'
import img3 from '../assets/images/img3.jpg'
import Footer from '../components/Footer'

const About = () => {
  return (
  <>
    
    <div className="h-[300px] text-center pt-[200px] " style={{ backgroundColor: "#F2F1EC" }}>
        <h1 className="text-4xl font-bold font-serif text-black">This is Our Story</h1>
      </div>

      <div>
        <img src={img3} alt="" className="w-full" />
      </div>
      
      <div className="text-center md:pl-[490px] pl-5 md:pr-[490px] pr-[40px] pt-10 pb-10 ">
        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis.  Ut hendrerit semper vel className aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p><br />
        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Ut hendrerit semper vel className aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>
      </div>
<Footer />
  </>
  )
}

export default About
