//external imports
import { NextFunction, Request, RequestHandler, Response, } from "express";
import { ObjectId, startSession } from "mongoose";
import httpStatus from "http-status";

//services
import roomServices from "../services/room.services";
import hotelServices from "../services/hotel.services";

//utils
import catchAsync from "../utils/catchAsync";
import ApiError from "../utils/ApiError";


const getRoomsByAdmin: RequestHandler = catchAsync(async (req: Request<{ adminId: ObjectId }>, res: Response) => {
    const rooms = await roomServices.getRoomsByAdminId(req.params.adminId)
    res.status(200).json({ status: true, data: rooms })
})

const getRoomsByHotelId: RequestHandler = catchAsync(async (req: Request<{ hotelId: ObjectId }>, res: Response) => {
    const rooms = await roomServices.getRoomByHotelId(req.params.hotelId)
    res.status(200).json({ status: true, data: rooms })
})

const getRoomsByRoomId: RequestHandler = catchAsync(async (req: Request<{ roomId: ObjectId }>, res: Response) => {
    const rooms = await roomServices.getRoomByRoomId(req.params.roomId)
    res.status(200).json({ status: true, data: rooms })
})

const createRoom: RequestHandler = catchAsync(async (req: Request<{ adminId: ObjectId }>, res: Response, next: NextFunction) => {
    const session = await startSession()
    try {
        session.startTransaction()
        //params check
        const hotel = await hotelServices.getHotelByHotelId(req.body.hotelId)
        if (!hotel) {
            throw new ApiError(httpStatus.BAD_REQUEST, "Hotel not found")
        }

        const room = await roomServices.createRoom(req.body).save({ session })
        hotel.rooms.push(room._id)
        hotel.save({ session })

        await session.commitTransaction()
        session.endSession()

        res.status(200).json({ status: true, data: room })
    } catch (error) {
        next(error)
        await session.abortTransaction()
        session.endSession()
    }

})


const updateRoomByRoomId: RequestHandler = catchAsync(async (req: Request<{ roomId: ObjectId }>, res: Response) => {
    const { roomId } = req.params

    //params check
    const room = await roomServices.getRoomByRoomId(roomId)
    if (!room) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Room not found")
    }

    const updateRoom = await roomServices.updateRoomByRoomId(roomId, req.body)

    res.status(200).json({ status: true, data: updateRoom })

})

const deleteRoomByRoomId: RequestHandler = catchAsync(async (req: Request<{ roomId: ObjectId }>, res: Response) => {
    const room = roomServices.deleteRoomByRoomId(req.params.roomId)
    res.status(200).json({ status: true, data: room })
})

export default {
    getRoomsByAdmin,
    getRoomsByHotelId,
    getRoomsByRoomId,
    createRoom,
    updateRoomByRoomId,
    deleteRoomByRoomId
}