import React, { useState } from 'react'
import BookingTripGrid from '../components/BookingTripGrid'

const BookOnline = () => {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <>
      <div 
        className="h-[300px] md:w-full w-full text-center md:pt-[200px] pt-[180px]" 
        style={{ backgroundColor: "#F2F1EC" }}
      >
        <h1 className="md:text-4xl text-3xl font-bold font-serif text-black">
          Choose Your Destination
        </h1>
      </div>

      {/* Search Bar */}
      <div className="border border-gray-700 w-[1100px] mt-10 h-14 rounded-full mx-auto flex items-center px-6">
        <input
          className="flex-1 text-xl text-gray-400 outline-none border-none hover:text-gray-800 bg-transparent"
          placeholder="Search Your Trip...."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // update query
        />
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="size-7 text-gray-700">
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Pass searchQuery to BookingTripGrid */}
      <BookingTripGrid searchQuery={searchQuery} />
    </>
  )
}

export default BookOnline
