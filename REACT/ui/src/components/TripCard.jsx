import React, { useState } from "react";
import { Link } from "react-router-dom";

const TripCard = ({ trip, onDelete }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Show only 70 characters when collapsed
  const description = showFullDescription
    ? trip.description
    : trip.description.substring(0, 70) + "...";

  return (
    <div className="flex flex-col justify-between border w-[440px] min-h-[600px] bg-black/50 rounded-lg shadow-lg mb-8 transition-all duration-300">
    
      <img
        src={
          trip.image
            ? `data:image/jpeg;base64,${trip.image}`
            : "/IMAGES/default.jpg"
        }
        alt={trip.name}
        className="w-full h-64 object-cover rounded-t-lg"
      />

      <div className="flex flex-col flex-grow px-7">
     
        <h1 className="text-2xl font-bold font-serif pt-3 text-white">
          {trip.name}
        </h1>
        <p className="text-xl font-serif text-red-800 font-bold">
          {trip.destination}
        </p>

        <div className="border border-gray-500 mt-2"></div>

     
        <h2 className="text-md pt-3 text-gray-300 text-justify pr-4">
          {description}
        </h2>

     
        {trip.description.length > 70 && (
          <button
            className="px-2 text-purple-400 hover:text-purple-600 py-2 text-left"
            onClick={() => setShowFullDescription(!showFullDescription)}
          >
            {showFullDescription ? "Show Less" : "Show More"}
          </button>
        )}

        {/* Spacer */}
        <div className="flex-grow"></div>

        {/* Seats + Days */}
        <div className="flex pt-2 text-white">
          <p>{trip.seatAvaliable} Slots</p>
          <p className="ml-auto">{trip.days} Days</p>
        </div>

        {/* Price + Date */}
        <div className="flex pt-3 text-white">
          <p className="font-bold text-2xl">₹ {trip.price}</p>
          <p className="ml-auto "> Date: {trip.date}</p>
        </div>
        <div className=" text-white pl-[269px]">
        <p className="">Time: {trip.time}</p>

        </div>

        {/* Buttons */}
        <div className="flex items-center mt-5 mb-7">
          <Link
            to="/updatetrip"
            className="bg-black text-white text-center w-[150px] h-10 font-bold rounded pt-2"
          >
            Update
          </Link>

          <button className="ml-auto" onClick={() => onDelete(trip._id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-red-600 hover:text-red-800"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6 7h12v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7zm3 2v8h2V9H9zm4 0v8h2V9h-2zm3-5V3a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1H5v2h14V4h-3z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
