import mongoose from "mongoose";
const RoomSchema = new mongoose.Schema(
  {
    roomnumber: {
      type: Number,
      required: true,
    },
    hotel: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    photos: {
      type: Array,
      required: true,
    },
    roomtype: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    status:{
      type: String,
      required: true,
    },
    rating: {
      type: Number,
    },
    reserve: {
      type: [String],
    },
    unavailableDates:{
      type:[Date]
    }
  },
  { timestamps: true }
);

export default mongoose.model("Room", RoomSchema);
