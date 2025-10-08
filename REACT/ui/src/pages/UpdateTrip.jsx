import React, { useState } from "react";
import img12 from "../assets/images/img12.jpg";
import { useNavigate } from "react-router-dom";

const UpdateTrip = () => {
  const [updateName, setUpdateName] = useState("");
  const [updateDestination, setUpdateDestination] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [updateSeatAvaliable, setUpdateSeatAvaliable] = useState("");
  const [updateDate, setUpdateDate] = useState("");
  const [updateTime, setUpdateTime] = useState("");
  const [updateAmPm, setUpdateAmPm] = useState("AM");
  const [updateDays, setUpdateDays] = useState("");
  const [updatePrice, setUpdatePrice] = useState("");
  const [updateContactNo, setUpdateContactNo] = useState("");
  const [updateTripImage, setUpdateTripImage] = useState(null);

  const navigate = useNavigate();

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", updateName);
      formData.append("destination", updateDestination);
      formData.append("description", updateDescription);
      formData.append("seatAvaliable", updateSeatAvaliable);
      formData.append("date", updateDate);
      formData.append("time", `${updateTime} ${updateAmPm}`);
      formData.append("days", updateDays);
      formData.append("price", updatePrice);
      formData.append("contactNo", updateContactNo);

      if (updateTripImage) formData.append("TripImage", updateTripImage);

      const res = await fetch("/api/updateTrip", {
        method: "PUT",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        alert("Trip updated successfully!");
        resetUpdateForm();
        navigate("/viewtrip");
      } else {
        alert(data.message || "Failed to update trip");
      }
    } catch (err) {
      console.error(err);
      alert("Internal server error");
    }
  };

  const resetUpdateForm = () => {
    setUpdateName("");
    setUpdateDestination("");
    setUpdateDescription("");
    setUpdateSeatAvaliable("");
    setUpdateDate("");
    setUpdateTime("");
    setUpdateAmPm("AM");
    setUpdateDays("");
    setUpdatePrice("");
    setUpdateContactNo("");
    setUpdateTripImage(null);
  };

  return (
    <>
      <div
        className="bg-cover bg-center h-screen w-full"
        style={{ backgroundImage: `url(${img12})` }}
      >
        <div className="bg-gray-700/70 w-full h-full">
          <h1 className="font-bold font-serif text-3xl text-white md:pt-10 pt-10 md:pl-[400px] pl-5">
            Update Trip
          </h1>
          <div className="bg-gray-800/50 md:w-[600px] w-[350px] md:h-[899px] h-[750px] md:ml-[790px] ml-5 md:mt-[-16px] mt-5 md:pl-[100px] pl-4 md:pt-4 pt-2">
            <form onSubmit={handleUpdateSubmit}>
              {/* Name */}
              <h1 className="md:text-xl font-serif text-white">Name</h1>
              <input
                type="text"
                value={updateName}
                onChange={(e) => setUpdateName(e.target.value)}
                className="md:w-[400px] w-[320px] h-11 border-2 border-black outline-none pl-3 mt-2 text-white"
              />

              {/* Destination */}
              <h1 className="md:text-xl font-serif text-white pt-2">
                Destination
              </h1>
              <input
                type="text"
                value={updateDestination}
                onChange={(e) => setUpdateDestination(e.target.value)}
                className="md:w-[400px] w-[320px] h-11 border-2 border-black outline-none pl-3 mt-2 text-white"
              />

              {/* Description */}
              <h1 className="md:text-xl font-serif text-white pt-2">
                Description
              </h1>
              <textarea
                value={updateDescription}
                onChange={(e) => setUpdateDescription(e.target.value)}
                className="md:w-[400px] w-[320px] h-20 border-2 border-black outline-none pl-3 mt-2 text-white"
              />

              {/* Seat Available */}
              <h1 className="md:text-xl font-serif text-white pt-2">
                Seat Available
              </h1>
              <input
                type="number"
                value={updateSeatAvaliable}
                onChange={(e) => setUpdateSeatAvaliable(e.target.value)}
                className="md:w-[400px] w-[320px] h-11 border-2 border-black outline-none pl-3 mt-2 text-white"
              />

              {/* Date and Time */}
              <div className="flex gap-3">
                <h1 className="md:text-xl font-serif text-white pt-2">Date</h1>
                <h1 className="md:text-xl font-serif text-white pt-2 pl-40">
                  Time
                </h1>
              </div>
              <div className="flex gap-3">
                <input
                  type="date"
                  value={updateDate}
                  onChange={(e) => setUpdateDate(e.target.value)}
                  className="md:w-[193px] w-[140px] h-11 border-2 border-black outline-none pl-3 mt-2 text-white"
                />
                <div className="border-2 border-black w-[195px] h-11 flex mt-2">
                  <input
                    type="time"
                    value={updateTime}
                    onChange={(e) => setUpdateTime(e.target.value)}
                    className="md:w-[150px] outline-none pl-3 bg-transparent text-white"
                  />
                  <select
                    value={updateAmPm}
                    onChange={(e) => setUpdateAmPm(e.target.value)}
                    className="outline-none bg-transparent text-white"
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              </div>

              {/* Days */}
              <h1 className="md:text-xl font-serif text-white pt-2">Days</h1>
              <input
                type="number"
                value={updateDays}
                onChange={(e) => setUpdateDays(e.target.value)}
                className="md:w-[400px] w-[320px] h-11 border-2 border-black outline-none pl-3 mt-2 text-white"
              />

              {/* Price */}
              <h1 className="md:text-xl font-serif text-white pt-2">Price</h1>
              <input
                type="number"
                value={updatePrice}
                onChange={(e) => setUpdatePrice(e.target.value)}
                className="md:w-[400px] w-[320px] h-11 border-2 border-black outline-none pl-3 mt-2 text-white"
              />

              {/* Contact No */}
              <h1 className="md:text-xl font-serif text-white pt-2">
                Contact No
              </h1>
              <input
                type="number"
                value={updateContactNo}
                onChange={(e) => setUpdateContactNo(e.target.value)}
                className="md:w-[400px] w-[320px] h-11 border-2 border-black outline-none pl-3 mt-2 text-white"
              />

              {/* Upload File */}
              <div className="flex md:w-[400px] w-[320px] h-11 border-2 mt-10">
                <h1 className="w-50 md:text-md font-serif bg-[#D9D9D9] pl-2 ">
                  Upload File
                </h1>
                <input
                  type="file"
                  name="TripImage"
                  accept="image/*"
                  onChange={(e) => setUpdateTripImage(e.target.files[0])}
                  className="pl-2 ml-2 pt-2 text-black"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="md:ml-16 ml-3 text-2xl font-bold font-serif text-white bg-black w-[300px] mt-5"
              >
                Update Trip
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateTrip;
