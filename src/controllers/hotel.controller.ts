import { Request, RequestHandler, Response, } from "express";
import hotelServices from "../services/hotel.services";
import catchAsync from "../utils/catchAsync";
import httpStatus from "http-status";
import { ObjectId } from "mongoose";
import userService from "../services/user.service";
import ApiError from "../utils/ApiError";


const getHotelsBySuperAdmin: RequestHandler = catchAsync(async (req: Request<{ adminId: ObjectId }>, res: Response) => {
    const hotels = await hotelServices.getHotels()
    res.status(200).json({ status: true, data: hotels })
})

const getHotelsByAdmin: RequestHandler = catchAsync(async (req: Request<{ adminId: ObjectId }>, res: Response) => {
    const hotels = await hotelServices.getHotelsByAdminId(req.params.adminId)
    res.status(200).json({ status: true, data: hotels })
})

const getHotelsByHotelId: RequestHandler = catchAsync(async (req: Request<{ adminId: ObjectId, hotelId: ObjectId, }>, res: Response) => {

    const { adminId, hotelId } = req.params
    const hotels = await hotelServices.getHotelByHotelId(adminId, hotelId)
    res.status(200).json({ status: true, data: hotels })
})

const createHotel: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    //params check
    const admin = await userService.getUserById(req.body.body)
    if (!admin) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Admin not found")
    }

    const hotel = await hotelServices.createHotel(req.body).save()

    res.status(200).json({ status: true, data: hotel })

})


const updateHotelByHotelId: RequestHandler = catchAsync(async (req: Request<{ adminId: ObjectId, hotelId: ObjectId, }>, res: Response) => {
    const { adminId, hotelId } = req.params

    //params check
    const hotel = await hotelServices.getHotelByHotelId(adminId, hotelId)
    if (!hotel) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Hotel not found")
    }

    const updateHotel = await hotelServices.updateHotelByHotelId(hotelId, req.body)

    res.status(200).json({ status: true, data: updateHotel, message: "Hotel update successfully" })

})

const deleteHotelByHotelId: RequestHandler = catchAsync(async (req: Request<{ adminId: ObjectId, hotelId: ObjectId, }>, res: Response) => {
    const { adminId, hotelId } = req.params
    const hotel = hotelServices.deleteHotelByHotelId(adminId, hotelId)
    res.status(200).json({ status: true, data: hotel, message: "Hotel deleted success" })
})

export default {
    getHotelsBySuperAdmin,
    getHotelsByAdmin,
    getHotelsByHotelId,
    createHotel,
    updateHotelByHotelId,
    deleteHotelByHotelId
}