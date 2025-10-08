import React, { useState, useEffect } from "react";
import TripCard from "./TripCard";
import bgImage from "../assets/images/img12.jpg";

const TripGrid = () => {
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

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/deleteTrip?id=${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        fetchTrips(); // Refresh the list after delete
      } else {
        alert(data.message || "Failed to delete trip");
      }
    } catch (error) {
      console.error(error);
      alert("Internal server error");
    }
  };

  return (
    <div
      className="bg-cover bg-center min-h-screen w-full overflow-auto"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-gray-700/70 min-h-screen w-full">
        <h1 className="font-bold font-serif text-3xl text-white pt-16 md:pl-[423px] pl-7">
          View Trip
        </h1>

        {loading ? (
          <h1 className="text-center text-xl font-bold my-10">Loading...</h1>
        ) : (
          <div className="md:grid md:grid-cols-3 gap-6 mt-16 md:ml-[430px] flex flex-col items-center">
            {trips.map((trip) => (
              <TripCard key={trip._id} trip={trip} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TripGrid;
