import mongoose from "mongoose";
const ReserveSchema = new mongoose.Schema(
  {
    reserveUser: {
      type: String,
    },
    reserveDate: {
      type: [Date],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Reserve", ReserveSchema);
