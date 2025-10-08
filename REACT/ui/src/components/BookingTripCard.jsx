import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BookingTripCard = ({ trip }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const navigate = useNavigate();

  // Show only 70 characters when collapsed
  const description = showFullDescription
    ? trip.description
    : trip.description.substring(0, 70) + "...";

  // Format date as DD-MM-YYYY
  const formattedTripDate = trip.date
    ? `${String(trip.date.split("-")[2]).padStart(2, "0")}-${String(trip.date.split("-")[1]).padStart(2, "0")}-${trip.date.split("-")[0]}`
    : '';

  const handleBookingClick = () => {
    navigate("/booking", {
      state: {
        destination: trip.destination,
        name: trip.name,
        date: trip.date,
        price: trip.price,
        time: trip.time
      }
    });
  };

  return (
    <div className="flex flex-col justify-between border w-[440px] min-h-[600px] rounded-lg shadow-lg mb-8 transition-all duration-300">
      <img
        src={trip.image ? `data:image/jpeg;base64,${trip.image}` : "/IMAGES/default.jpg"}
        alt={trip.name}
        className="w-full h-64 object-cover rounded-t-lg"
      />

      <div className="flex flex-col flex-grow px-7">
        <h1 className="text-2xl font-bold font-serif pt-3">{trip.name}</h1>
        <p className="text-xl font-serif text-red-800 font-bold">{trip.destination}</p>

        <div className="border border-gray-500 mt-2"></div>

        <h2 className="text-md pt-3 text-gray-800 text-justify pr-4">{description}</h2>

        {trip.description.length > 70 && (
          <button
            className="px-2 text-purple-400 hover:text-purple-600 py-2 text-left"
            onClick={() => setShowFullDescription(!showFullDescription)}
          >
            {showFullDescription ? "Show Less" : "Show More"}
          </button>
        )}

        <div className="flex-grow"></div>

        <div className="flex pb-7">
          <p>{trip.seatAvaliable} Seats Available</p>
          <p className="ml-auto">{trip.days} Days</p>
        </div>

        <div className="flex">
          <p className="font-bold text-2xl text-red-600">₹ {trip.price}</p>
          <p className="ml-auto font-bold text-xl">Date: {formattedTripDate}</p>
        </div>

        <div className='ml-[270px] pb-4'>
          <p>Time: {trip.time}</p>
        </div>

        <button
          onClick={handleBookingClick}
          className="text-center w-[150px] h-10 font-bold mb-5 bg-black text-white"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default BookingTripCard;
