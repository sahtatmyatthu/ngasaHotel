import Room from "../models/Room.js";
import Reserve from "../models/Reserve.js";
export const reserve = async (req, res, next) => {
  const roomId = req.params.roomId;

  const newReserve = new Reserve(req.body);

  try {
    const saveReserve = await newReserve.save();
    try {
      await Room.findByIdAndUpdate(roomId, {
        $push: { reserve: saveReserve._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(saveReserve);
  } catch (err) {
    next(err);
  }
};
