import React, { useEffect, useState } from "react";
import img12 from "../assets/images/img12.jpg";

const BookingDetails = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await fetch(`/api/BookingDetails`, { credentials: "include" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch bookings");
      setBookings(data.result || []);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  return (
    <div
      className="bg-cover bg-center h-screen w-full"
      style={{ backgroundImage: `url(${img12})` }}
    >
      <div className="bg-gray-700/70 w-full h-full">
        <h1 className="font-bold font-serif text-3xl text-white pt-16 md:pl-[350px] pl-6">
          Booking Details
        </h1>
        <div className="w-full overflow-x-auto">
          <table className="border border-white text-white w-[1390px] md:ml-[350px] ml-6 md:mr-0 mr-7 mt-10 bg-gray-700/30">
            <thead>
              <tr>
                <th className="border border-white px-4 py-2">Destination</th>
                <th className="border border-white px-4 py-2">First Name</th>
                <th className="border border-white px-4 py-2">Last Name</th>
                <th className="border border-white px-4 py-2">Email</th>
                <th className="border border-white px-4 py-2">Phone</th>
                <th className="border border-white px-4 py-2">Members</th>
                <th className="border border-white px-4 py-2">Message</th>
                <th className="border border-white px-4 py-2">Date</th>
                <th className="border border-white px-4 py-2">Time</th>
                <th className="border border-white px-4 py-2">Payment</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? bookings.map((booking) => (
                <tr key={booking._id}>
                  <td className="border border-white px-4 py-2 text-center">{booking.destination}</td>
                  <td className="border border-white px-4 py-2 text-center">{booking.firstName}</td>
                  <td className="border border-white px-4 py-2 text-center">{booking.lastName}</td>
                  <td className="border border-white px-4 py-2 text-center">{booking.email}</td>
                  <td className="border border-white px-4 py-2 text-center">{booking.phone}</td>
                  <td className="border border-white px-4 py-2 text-center">{booking.memberNo}</td>
                  <td className="border border-white px-4 py-2 text-center">{booking.message}</td>
                  <td className="border border-white px-4 py-2 text-center">
                    {booking.date ? new Date(booking.date).toLocaleDateString() : ""}
                  </td>
                  <td className="border border-white px-4 py-2 text-center">{booking.time}</td>
                  <td className="border border-white px-4 py-2 text-center">₹ {booking.totalPrice}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="10" className="border border-white text-center py-4">
                    No bookings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
