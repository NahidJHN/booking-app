import { Types } from "mongoose"

interface roomNumber {
    number: number;
    unavailableDates: Types.DocumentArray<Date>
}


export default interface IRoomModel {
    title: string,
    price: Number,
    description: Number,
    maxPeople: boolean,
    roomNumber: Types.DocumentArray<roomNumber>
}


