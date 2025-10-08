import React, { useState } from "react";
import img12 from "../assets/images/img12.jpg";

const AddTrip = () => {
  const [name, setName] = useState("");
  const [destination, setDestination] = useState("");
  const [description, setDescription] = useState("");
  const [seatAvaliable, setSeatAvaliable] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [ampm, setAmpm] = useState("AM");
  const [days, setDays] = useState("");
  const [price, setPrice] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [tripImage, setTripImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      const formattedTime = `${time} ${ampm}`;

      formData.append("name", name);
      formData.append("destination", destination);
      formData.append("description", description);
      formData.append("seatAvaliable", seatAvaliable);
      formData.append("date", date);
      formData.append("time", formattedTime);
      formData.append("days", days);
      formData.append("price", price);
      formData.append("contactNo", contactNo);
      if (tripImage) formData.append("TripImage", tripImage);

      const token = localStorage.getItem("token"); // assuming JWT stored in localStorage

      const res = await fetch("/api/addTrip", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // send token for auth
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error adding trip");
      }

      alert("Trip added successfully");

      // Reset form
      setName("");
      setDestination("");
      setDescription("");
      setSeatAvaliable("");
      setDate("");
      setTime("");
      setAmpm("AM");
      setDays("");
      setPrice("");
      setContactNo("");
      setTripImage(null);
    } catch (err) {
      console.error(err);
      alert("Something went wrong: " + err.message);
    }
  };

  return (
    <div
      className="bg-cover bg-center h-screen w-full"
      style={{ backgroundImage: `url(${img12})` }}
    >
      <div className="bg-gray-700/70 w-full h-full">
        <h1 className="font-bold font-serif text-3xl text-white md:pt-10 pt-10 md:pl-[400px] pl-5">
          Add Trip
        </h1>
        <div className="bg-gray-800/50 md:w-[600px] w-[350px] md:h-[899px] h-[750px] md:ml-[790px] ml-5 md:mt-[-16px] mt-5 md:pl-[100px] pl-4 md:pt-4 pt-2">
          <form onSubmit={handleSubmit}>
            {/* Inputs for all fields */}
            <h1 className="md:text-xl font-serif text-white">Name</h1>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="md:w-[400px] w-[320px] h-11 border-2 border-black outline-none pl-3 mt-2 text-white"
            />
            <h1 className="md:text-xl font-serif text-white pt-2">Destination</h1>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="md:w-[400px] w-[320px] h-11 border-2 border-black outline-none pl-3 mt-2 text-white"
            />
            <h1 className="md:text-xl font-serif text-white pt-2">Description</h1>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="md:w-[400px] w-[320px] h-20 border-2 border-black outline-none pl-3 mt-2 text-white"
            />
            <h1 className="md:text-xl font-serif text-white pt-2">Seat Available</h1>
            <input
              type="number"
              value={seatAvaliable}
              onChange={(e) => setSeatAvaliable(e.target.value)}
              className="md:w-[400px] w-[320px] h-11 border-2 border-black outline-none pl-3 mt-2 text-white"
            />
            <div className="flex gap-3">
              <h1 className="md:text-xl font-serif text-white pt-2">Date</h1>
              <h1 className="md:text-xl font-serif text-white pt-2 pl-40">Time</h1>
            </div>
            <div className="flex gap-3">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="md:w-[193px] w-[140px] h-11 border-2 border-black outline-none pl-3 mt-2 text-white"
              />
              <div className="border-2 border-black w-[195px] h-11 flex mt-2">
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="md:w-[150px] outline-none pl-3 bg-transparent text-white"
                />
                <select
                  value={ampm}
                  onChange={(e) => setAmpm(e.target.value)}
                  className="outline-none bg-transparent text-white"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>
            <h1 className="md:text-xl font-serif text-white pt-2">Days</h1>
            <input
              type="number"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              className="md:w-[400px] w-[320px] h-11 border-2 border-black outline-none pl-3 mt-2 text-white"
            />
            <h1 className="md:text-xl font-serif text-white pt-2">Price</h1>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="md:w-[400px] w-[320px] h-11 border-2 border-black outline-none pl-3 mt-2 text-white"
            />
            <h1 className="md:text-xl font-serif text-white pt-2">Contact No</h1>
            <input
              type="number"
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
              className="md:w-[400px] w-[320px] h-11 border-2 border-black outline-none pl-3 mt-2 text-white"
            />
            <div className="flex md:w-[400px] w-[320px] h-11 border-2 mt-10">
              <h1 className="w-50 md:text-md  font-serif bg-[#D9D9D9] pl-2 ">
                Upload File
              </h1>
              <input
                type="file"
                name="TripImage"
                accept="image/*"
                onChange={(e) => setTripImage(e.target.files[0])}
                className="pl-2 ml-2 pt-2 text-black"
              />
            </div>
            <button
              type="submit"
              className="md:ml-16 ml-3 text-2xl font-bold font-serif text-white bg-black w-[300px] mt-5"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTrip;
