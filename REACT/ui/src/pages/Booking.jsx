import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo2 from '../assets/images/logo2.png';
import logo1 from '../assets/images/logo1.png';

const Booking = () => {
  const location = useLocation();
  const { destination, name, price, date, time } = location.state || {}; // Trip details
  const navigate = useNavigate();

  // Client form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [membersNo, setMembersNo] = useState(1);
  const [message, setMessage] = useState('');

  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const tripDate = date ? new Date(date) : null;
  const totalPrice = (Number(price) || 0) * (Number(membersNo) || 0);

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setBookingSubmitted(true);
    alert("Details saved, please confirm booking!");
  };

  // Confirm booking
  const handleBookNow = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/AddBookingDetails?name=${destination}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          FirstName: firstName,
          LastName: lastName,
          Email: email,
          Phone: phone,
          MemberNo: membersNo,
          Message: message
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Error confirming booking');
      } else {
        alert(`Booking confirmed! Remaining seats: ${data.remainingSeats}`);
        navigate('/profile');
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Back button */}
      <div className="md:mt-[150px] mt-[100px] md:ml-16 ml-3 text-black absolute text-xl font-bold font-serif">
        <Link to='/bookonline' className="flex">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            fill="currentColor" className="size-7">
            <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 
              1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
              clipRule="evenodd" />
          </svg>
          <p>Back</p>
        </Link>
      </div>

      <h1 className="absolute md:mt-[210px] mt-[200px] font-bold font-serif 
                     md:text-5xl text-3xl md:pl-32 pl-26">
        Booking Form - {destination}
      </h1>

      <div className="md:grid md:grid-cols-2 absolute md:mt-[300px] mt-[250px]">
        {/* Client Details Form */}
        <div className="md:pl-32 pl-9 text-xl font-serif">
          <h2 className="font-bold">Client Details</h2>

          <form onSubmit={handleSubmit}>
            <div className="md:flex mt-10">
              <div>
                <p>First Name*</p>
                <input type="text" className="h-[45px] md:w-[500px] w-[320px] border-3 mt-3"
                  value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div className="md:ml-20 md:mt-0 mt-3">
                <p>Last Name*</p>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}
                  className="h-[45px] md:w-[500px] w-[320px] border-3 mt-3" />
              </div>
            </div>

            <div className="md:flex md:mt-10 mt-3">
              <div>
                <p>Email*</p>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="h-[45px] md:w-[500px] w-[320px] border-3 mt-3" />
              </div>
              <div className="md:ml-20 md:mt-0 mt-3">
                <p>Phone*</p>
                <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)}
                  className="h-[45px] md:w-[500px] w-[320px] border-3 mt-3" />
              </div>
            </div>

            <div className="md:mt-10 mt-3 md:ml-[440px]">
              <p>Member No*</p>
              <input type="number" value={membersNo} onChange={(e) => setMembersNo(e.target.value)}
                className="h-[45px] md:w-[200px] w-[320px] border-3 mt-3" />
            </div>

            <div className="md:mt-0 mt-3">
              <p>Add your Message</p>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)}
                className="h-[120px] md:w-[1080px] w-[320px] border-3 mt-3"></textarea>
            </div>

            <button type='submit' className="bg-black text-white text-center h-[45px] md:w-[453px] 
                         w-[330px] md:ml-65 ml-5 font-bold text-2xl mt-6">
              Submit
            </button>
          </form>
        </div>

        {/* Booking Details & Payment */}
        <div className="md:mt-0 mt-10">
          <div className="md:pl-[360px] font-serif">
            <h2 className="font-bold md:pl-[150px] pl-[110px] text-2xl pb-3">
              Booking Details
            </h2>
            <div className="border md:w-[450px] w-[330px] md:ml-0 ml-5"></div>

            {bookingSubmitted && (
              <>
                <h1 className="font-bold font-serif text-2xl pt-2 md:pl-0 pl-4">
                  {name} - {destination}
                </h1>

                <p className="text-gray-400 pt-2 md:pl-0 pl-4">
                  {tripDate ? `${tripDate.getDate()} ${tripDate.toLocaleString('default', { month: 'long' })} ${tripDate.getFullYear()}` : ''} at {time}
                </p>

                <div className="flex pt-7 text-gray-400 mb-3 md:pl-0 pl-4">
                  <details className="w-full">
                    <summary>More details</summary>
                    <p>First Name: {firstName}</p>
                    <p>Last Name: {lastName}</p>
                    <p>Email: {email}</p>
                    <p>Phone: {phone}</p>
                    <p>Message: {message}</p>
                  </details>
                </div>
              </>
            )}

            <div className="border md:w-[450px] w-[330px] md:ml-0 ml-5"></div>
            <h1 className="text-2xl font-bold font-serif pt-2 pb-3 md:pl-0 pl-4">
              Payment Details
            </h1>

            {bookingSubmitted && (
              <>
                <div className="flex font-serif text-xl md:pl-0 pl-4">
                  <p>Members:</p>
                  <p className="md:pl-[350px] pl-[240px]">{membersNo}</p>
                </div>
                <div className="flex font-serif pt-2 text-xl md:pl-0 pl-4">
                  <p>Price</p>
                  <p className="font-bold md:pl-[341px] pl-[232px]">₹ {totalPrice}</p>
                </div>
              </>
            )}

            {/* Payment Method */}
            <div className="border md:w-[450px] w-[330px] mt-4 md:ml-0 ml-5"></div>
            <div className="flex md:ml-0 ml-5">
              <div className="border-2 h-6 text-sm text-center w-10 font-sans mt-3 rounded font-bold">UPI</div>
              <p className="pt-2 pl-5 font-bold text-xl">UPI</p>
            </div>
            <div className="flex md:ml-0 ml-5">
              <input type="radio" name="payment" className="mt-5 size-5" />
              <p className="font-bold pl-6 text-2xl pt-3">Paytm</p>
              <img src={logo1} alt="" className="w-10 h-4 mt-6 md:ml-[290px] ml-[180px]" />
            </div>
            <div className="flex md:ml-0 ml-5">
              <input type="radio" name="payment" className="mt-5 size-5" />
              <p className="font-bold pl-6 text-2xl pt-3">Google Pay</p>
              <img src={logo2} alt="" className="w-12 h-8 md:mt-6 mt-3 md:ml-[236px] ml-[125px]" />
            </div>

            {/* Book Now Button */}
            {bookingSubmitted && (
              <button
                onClick={handleBookNow}
                disabled={loading}
                className="bg-black text-white text-center h-[45px] md:w-[453px] w-[330px] 
                           md:ml-0 ml-5 font-bold text-2xl mt-6 mb-10"
              >
                {loading ? "Processing..." : "Book Now"}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Booking;
