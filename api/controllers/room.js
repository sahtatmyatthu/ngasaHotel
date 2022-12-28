import Reserve from "../models/Reserve.js";
import Room from "../models/Room.js";

export const createRoom = async (req, res, next) => {
  const newRoom = new Room(req.body);
  try {
    const savedRoom = await newRoom.save();
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const updateRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateRoom);
  } catch (err) {
    next(err);
  }
};

export const deleteRoom = async (req, res, next) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.status(200).json("Room has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const getRoomById = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

export const getByRoomType = async (req, res, next) => {
  try {
    const room = await Room.find(req.query);

    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

export const getByRating = async (req, res, next) => {
  try {
    const rate = await Room.find({ rating: { $gt: 4 } }).limit(req.query.limit);
    res.status(200).json(rate);
  } catch (err) {
    next(err);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const singleCount = await Room.countDocuments({ roomtype: "Single" });
    const doubleCount = await Room.countDocuments({ roomtype: "Double" });
    const studioCount = await Room.countDocuments({ roomtype: "Studio" });
    const viewCount = await Room.countDocuments({ roomtype: "View" });
    const suiteCount = await Room.countDocuments({ roomtype: "Suite" });


    res.status(200).json([
      { roomtype: "Single Room", count: singleCount },
      { roomtype: "Double Room", count: doubleCount },
      { roomtype: "Studio Room", count: studioCount },
      { roomtype: "View Room", count: viewCount },
      { roomtype: "Suite Room", count: suiteCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const countAll = async(req, res, next)=>{
  try {
    const countAll = await Room.countDocuments({});
    res.status(200).json(countAll)
    
  } catch (err) {
    next(err)
    
  }
}

export const getRooms = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const rooms = await Room.find({
      ...others,
      price: { $gt: min | 1, $lt: max || 999 },
    });
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};

export const getReserve = async (req, res, next)=>{
  try {
    const room = await Room.findById(req.params.id);
    const list = await Promise.all(
      room.reserve.map((item) => {
        return Reserve.findById(item);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
}

export const roomAvailability = async (req, res, next) => {
  try {
    const updateRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $push: req.body },
      { new: true }
    );
    res.status(200).json(updateRoom);
  } catch (err) {next(err)}
};

export const updateAvailableRoom = async (req, res, next)=>{
  try {
    const id = req.params.id;
    const updateAvailableRoom = await Room.findByIdAndUpdate(
      id,
      {
        $push:{reserve:{user:"", unavailableDates:[]}}
      }
    )
    res.status(200).json(updateAvailableRoom);
    
  } catch (err) {
    next(err)
  }
}
