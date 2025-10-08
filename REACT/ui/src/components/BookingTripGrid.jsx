import React, { useState, useEffect } from "react";
import BookingTripCard from "./BookingTripCard"; 

const BookingTripGrid = ({ searchQuery }) => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTrips = async () => {
    try {
      const res = await fetch("/api/getAllTrip", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (res.ok) {
        const tripsData = await res.json();
        setTrips(tripsData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  // 🔍 Filter trips by destination
  const query = searchQuery.toLowerCase();
  const filteredTrips = !query
    ? trips
    : trips.filter((trip) =>
        trip.destination?.toLowerCase().includes(query)
      );

  // 🕒 Filter expired trips
  const validTrips = filteredTrips.filter((trip) => {
    if (!trip.date || !trip.time) return true; // Keep if no date/time
  
    const [year, month, day] = trip.date.split("-").map(Number);
  
    // Convert 12-hour time to 24-hour
    let [timePart, modifier] = trip.time.split(" "); // ["10:00", "AM"]
    let [hours, minutes] = timePart.split(":").map(Number);
    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
  
    const tripDateTime = new Date(year, month - 1, day, hours, minutes, 0, 0);
    return tripDateTime >= new Date();
  });
  return (
    <div>
      {loading ? (
        <h1 className="text-center text-xl font-bold my-10">Loading...</h1>
      ) : (
        <div className="md:grid md:grid-cols-3 gap-6 mt-16 flex flex-col justify-items-center ml-20">
          {validTrips.length > 0 ? (
            validTrips.map((trip) => (
              <BookingTripCard key={trip._id} trip={trip} />
            ))
          ) : (
            <p className="text-lg text-gray-500 mt-10 col-span-3">
              No trips found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default BookingTripGrid;
