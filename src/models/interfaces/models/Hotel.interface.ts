import { Types } from "mongoose"
import mongoose from "mongoose"


export default interface IHotelModel {
    admin: mongoose.Schema.Types.ObjectId,
    name: string,
    type: string,
    city: string,
    address: string,
    distance: string,
    images?: Types.Array<string>,
    description: string,
    title: string,
    rating?: Number,
    cheapestPrice: Number,
    featured?: boolean,
    rooms: Types.DocumentArray<Types.ObjectId>
}


