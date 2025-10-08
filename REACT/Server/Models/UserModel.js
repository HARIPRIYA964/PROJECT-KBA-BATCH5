import { Schema, model } from "mongoose";

const BookingSchema = new Schema({
    firstName: String,
    lastName: String,
    email: { type: String, required: true },
    phone: String,
    memberNo: String,
    message: String,
    tripName: String,
    tripDate: Date,
    tripTime: String,
    pricePerPerson: Number,
    totalPrice: Number,
    destination: String,
    date: Date,
    time: String,
    contactNo:Number,
    days:String
});

const Booking = model('Booking_Details', BookingSchema);

export { Booking };
