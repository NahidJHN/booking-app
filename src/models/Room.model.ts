import { model, Schema, Types } from "mongoose";
import paginate from "./plugins/paginate.plugin";
import IRoomModel from "./interfaces/models/Rooms.interface";

const roomSchema = new Schema<IRoomModel>(
    {
        admin: {
            type: Types.ObjectId,
            required: true,
        },
        hotel: {
            type: Types.ObjectId,
            required: true,
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        maxPeople: {
            type: Number,
            required: true
        },
        roomNumber: [
            {
                number: String,
                unavailableDates: [Date]
            }
        ]
    },
    {
        timestamps: true,
    }
);

roomSchema.plugin(paginate);

const Room = model<IRoomModel>("Room", roomSchema);

export default Room;
