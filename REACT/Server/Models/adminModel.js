import { Schema, model } from "mongoose";

const TripSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  destination: { type: String, required: true, unique: true }, // keep unique if needed
  seatAvaliable: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  days: { type: String, required: true },
  price: { type: String, required: true },
  contactNo: { type: String, required: true },
  image: { type: String, required: true },
});

const Trip = model("AddTrip", TripSchema);

export { Trip };
