import { Types } from "mongoose"


export default interface IHotelModel {
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


