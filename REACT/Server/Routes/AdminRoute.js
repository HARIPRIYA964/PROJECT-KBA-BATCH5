import {Router} from 'express'
import authenticate from '../Middleware/auth.js'
import {Login} from '../Models/Login.js'
import adminCheck from '../Middleware/adminAuth.js'
import upload from '../Middleware/Upload.js';
import { Trip } from '../Models/adminModel.js';

const adminroute = Router();


// Convert buffer to Base64
const convertToBase64 = (buffer) => buffer.toString("base64");

// Add Trip
adminroute.post( "/addTrip",authenticate,adminCheck,upload.single("TripImage"),async (req, res) => {
    try {
      const {name,description,destination,seatAvaliable,date,time,days,price,contactNo,} = req.body;
      const existingTrip = await Trip.findOne({ destination });
      if (existingTrip) {
        return res.status(400).json({ message: "Trip with this destination already exists" });
      }

      let imageBase64 = null;
      if (req.file) {
        imageBase64 = convertToBase64(req.file.buffer);
      }

      const newTrip = new Trip({
        name,
        description,
        destination,
        seatAvaliable,
        date,
        time,
        days,
        price,
        contactNo,
        image: imageBase64,
      });

      await newTrip.save();
      res.status(201).json({ message: "Trip successfully entered" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });


  adminroute.get('/getAllTrip',authenticate,async(req,res)=>{
    try{
      const Trips =  await Trip.find({})
      res.status(201).json(Trips)
    }
    catch (err) {
      console.error(err)
      res.status(500).json({ msg: "Internal Server Error" })
    }
  })


adminroute.put('/updateTrip',authenticate,adminCheck,upload.single("TripImage"),async(req,res)=>{
  try{
    const { name, description, destination, seatAvaliable, date,time, days, price,contactNo } = req.body;
    const result = await Trip.findOne({destination:destination})
      if(result){
        result.name = name
        result.description = description
        result.seatAvaliable = seatAvaliable
        result.date = date
        result.time = time
        result.days = days
        result.price = price
        result.contactNo = contactNo
        
          if(req.file){
              result.image = convertToBase64(req.file.buffer)
          }
          await result.save();
          res.status(201).json({message:"Trip details updated successfully"})
      }
      else{
          res.status(404).json({message:"Trip not found"})
      }
  }
  catch(error){
      console.log(error);
      res.status(500).json({message:"Internal server error"})
      
  }
})

adminroute.delete('/deleteTrip', authenticate, adminCheck, async (req, res) => {
  try {
    const tripId = req.query.id;
    if (!tripId) {
       res.status(400).json({ message: "Trip ID is required" });
    }

    const result = await Trip.findByIdAndDelete(tripId);

    if (!result){
         res.status(404).json({ message: "Trip not found" });
  }
    res.status(200).json({ message: "Trip deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});






adminroute.get('/getAllUser', authenticate,adminCheck, async (req, res) => {
    try {
      const Users = await Login.find({ userType: "user" })
  
      res.status(200).json(Users);
    } catch (err) {
      console.error(err)
      res.status(500).json({ msg: "Internal Server Error" })
    }
  })



export {adminroute}