import { Router } from "express";
import { Booking } from "../Models/UserModel.js";
import authenticate from '../Middleware/auth.js';
import { Trip } from '../Models/adminModel.js';

const UserRoute = Router();

// Add Booking Details

UserRoute.post('/AddBookingDetails', authenticate, async (req, res) => {
  try {
    const { FirstName, LastName, Email, Phone, MemberNo, Message } = req.body;
    const Destination = req.query.name;

    const trip = await Trip.findOne({ destination: Destination });
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    // Check seat availability
    const totalSeats = parseInt(trip.seatAvaliable);
    const requestedSeats = parseInt(MemberNo);
    if (requestedSeats > totalSeats) {
      return res.status(400).json({ message: `Only ${totalSeats} seats left, cannot book ${requestedSeats}` });
    }

    const totalPrice = trip.price * requestedSeats;

    const newBooking = new Booking({
      firstName: FirstName,
      lastName: LastName,
      email: Email,
      phone: Phone,
      memberNo: MemberNo,
      message: Message,
      destination: Destination,
      tripName: trip.destination,
      tripDate: trip.date,
      tripTime: trip.time,
      pricePerPerson: trip.price,
      totalPrice: totalPrice,
      date: trip.date,
      time: trip.time,
      days: trip.days,
      contactNo:trip.contactNo
    });

    await newBooking.save();

    // Reduce available seats
    trip.seatAvaliable = totalSeats - requestedSeats;
    await trip.save();

    res.status(201).json({
      message: "Booking Successful",
      remainingSeats: trip.seatAvaliable,
      booking: newBooking
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});




// Get bookings by email
UserRoute.get("/BookingDetails", authenticate, async (req, res) => {
  try {
    const result = await Booking.find(); // fetch all bookings

    if (result && result.length > 0) {
      res.status(200).json({ result });
    } else {
      res.status(404).json({ message: "No bookings found" });
    }
  } catch (error) {
    console.error("Error fetching booking details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

UserRoute.get('/BookingDetails', authenticate, async (req, res) => {
  try {
    const bookings = await Booking.find({ email: req.email });
    if (bookings.length === 0) return res.status(404).json({ message: "No bookings found" });
    res.status(200).json({ result: bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete booking
// UserRoute.delete("/DeleteBooking/:id", authenticate, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleted = await Booking.findByIdAndDelete(id);

//     if (!deleted) {
//       return res.status(404).json({ message: "Booking not found" });
//     }

//     res.status(200).json({ message: "Booking deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting booking:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });




export { UserRoute };
