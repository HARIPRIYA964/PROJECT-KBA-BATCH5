import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import profileImg from '../assets/images/profile.jpeg';

const Profile = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
  });

  const [bookings, setBookings] = useState([]); 
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingBookings, setLoadingBookings] = useState(true);
 
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Only one '/api' — Vite proxy handles forwarding to backend
        const res = await fetch('/api/profile', { credentials: 'include' });
  
        if (!res.ok) throw new Error('Failed to fetch profile');
  
        const data = await res.json();
        setUser(data);
        setLoadingProfile(false);
      } catch (err) {
        console.error(err);
        setLoadingProfile(false);
      }
    };
    fetchProfile();
  }, []);
  
  useEffect(() => {
    if (!user.email) return;
    const fetchBookings = async () => {
      try {
        // Again, only one '/api'
        const res = await fetch('/api/BookingDetails', { credentials: 'include' });
  
        if (!res.ok) throw new Error('Failed to fetch bookings');
  
        const data = await res.json();
        setBookings(data.result || []);
        setLoadingBookings(false);
      } catch (err) {
        console.error(err);
        setLoadingBookings(false);
      }
    };
    fetchBookings();
  }, [user.email]);

  return (
    <div className="relative min-h-screen bg-gray-50">
      <Link to="/home" className="flex items-center absolute top-6 left-6 text-black text-xl font-bold font-serif">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7">
          <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd"/>
        </svg>
        <p>Back</p>
      </Link>

      <div className="flex ml-20 pt-32 overflow-hidden">
        {/* Profile Card */}
        <div className="border rounded-2xl shadow-lg bg-white w-[400px] h-[650px] p-8 text-center">
          <img src={profileImg} alt="Profile" className="mx-auto w-32 h-32 rounded-full border-4 border-gray-300 object-cover" />
          {loadingProfile ? (
            <p className="mt-6">Loading...</p>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-red-900 mt-6">{user.username}</h1>
              <p className="text-xl font-serif font-semibold text-gray-700 mt-2">{user.email}</p>
            </>
          )}
          <div className="mt-8 border-t pt-6"></div>
        </div>

        {/* Booking Details */}
        <div className='grid grid-cols-1'>
          <div className="border rounded-2xl shadow-lg bg-white w-[800px] h-[650px] p-8 ml-40 overflow-y-auto">
            <h1 className='font-bold text-xl text-center'>Booking Details</h1>
            {loadingBookings ? (
              <p className="text-center mt-10">Loading bookings...</p>
            ) : bookings.length === 0 ? (
              <p className="text-center mt-10">No bookings found.</p>
            ) : (
              bookings.map((booking, index) => (
                <div key={index} className="mt-6 border-t pt-4 ">
                 <div className='ml-20'>
                 <p><strong  className='pr-30 '>Destination:</strong> {booking.destination}</p>
                  <p className='pt-2'><strong className='pr-41 '>Name:</strong> {booking.firstName} {booking.lastName}</p>
                  <p className='pt-2'><strong className='pr-40'>Phone:</strong> {booking.phone}</p>
                  <p className='pt-2'><strong className='pr-21 '>Booking slot No:</strong> {booking.memberNo} Slot Booked</p>
                  <p className='pt-2'><strong  className='pr-42 '>Days:</strong> {booking.days}</p>
                  <p className='pt-2'><strong className='pr-42 '>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
                  <p className='pt-2'><strong className='pr-42 '>Time:</strong> {booking.time}</p>
                  <p className='pt-2'><strong className='pr-31 '>Total Price:</strong> ₹ {booking.totalPrice}</p>
                  <p className='pt-2'><strong className='pr-30 '>contact No:</strong> {booking.contactNo}</p>
                 </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
