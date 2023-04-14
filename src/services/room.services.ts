import { ObjectId, } from "mongoose";

//models
import Room from "../models/Room.model";


const getRoomsByAdminId = (adminId: ObjectId) => {
    return Room.find({ admin: adminId })
}


const getRoomByHotelId = (hotelId: ObjectId) => {
    return Room.findOne({ hotel: hotelId })
}



const getRoomByRoomId = (roomId: ObjectId) => {
    return Room.findOne({ _id: roomId })
}

const createRoom = (data: object) => {
    return new Room({
        ...data
    })

}
const updateRoomByRoomId = (roomId: ObjectId, data: object) => {
    return Room.findByIdAndUpdate(roomId, { $set: data })
}

const deleteRoomByRoomId = (roomId: ObjectId) => {
    return Room.findOneAndDelete({ _id: roomId })
}

export default {
    getRoomsByAdminId,
    getRoomByRoomId,
    createRoom,
    updateRoomByRoomId,
    deleteRoomByRoomId,
    getRoomByHotelId
}