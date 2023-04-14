import { model, Schema, Types } from "mongoose";
import paginate from "./plugins/paginate.plugin";
import IHotelModel from "./interfaces/models/Hotel.interface";

const hotelSchema = new Schema<IHotelModel>(
    {
        admin: {
            type: Types.ObjectId,
            required: true
        },
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        distance: {
            type: String,
            required: true,
        },
        images: Array,
        description: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        rating: Number,
        cheapestPrice: {
            type: String,
            required: true,
        },
        featured: {
            type: Boolean,
        },
        rooms: [Types.ObjectId],

    },
    {
        timestamps: true,
    }
);

hotelSchema.plugin(paginate);

const Hotel = model<IHotelModel>("Hotel", hotelSchema);

export default Hotel;
