import { ObjectId, } from "mongoose";

//models
import Hotel from "../models/Hotels.model";


const getHotels = () => {
    return Hotel.find({})
}

const getHotelsByAdminId = (adminId: ObjectId) => {
    return Hotel.find({ admin: adminId })
}

const getHotelByHotelId = (adminId: ObjectId, hotelId: ObjectId) => {
    return Hotel.findOne({ _id: hotelId, admin: adminId })
}
const createHotel = (data: object) => {
    return new Hotel({
        ...data
    })

}

const updateHotelByHotelId = (hotelId: ObjectId, data: object) => {
    return Hotel.findByIdAndUpdate(hotelId, { $set: data })
}

const deleteHotelByHotelId = (adminId: ObjectId, hotelId: ObjectId) => {
    return Hotel.findOneAndDelete({ _id: hotelId, admin: adminId })
}

export default {
    getHotels,
    getHotelsByAdminId,
    getHotelByHotelId,
    createHotel,
    updateHotelByHotelId,
    deleteHotelByHotelId
}