import mongoose, { Types } from "mongoose"

interface roomNumber {
    number: string;
    unavailableDates: Types.DocumentArray<Date>
}


export default interface IRoomModel {
    admin: mongoose.Schema.Types.ObjectId,
    hotel: mongoose.Schema.Types.ObjectId,
    title: string,
    price: number,
    description: string,
    maxPeople: number,
    roomNumber: Types.DocumentArray<roomNumber>
}


