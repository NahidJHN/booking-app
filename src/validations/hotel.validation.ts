import { mongoIDRegx } from "./custom.validation";

const createHotel = {
    type: "object",
    required: ["admin", "name", "type", "city", "address", "distance", 'description', "title", "cheapestPrice",],
    properties: {
        admin: {
            type: "string", pattern: mongoIDRegx
        },
        email: {
            type: "admin",
            format: "email",
        },
        name: {
            type: "string",
        },
        type: {
            type: "string",
        },
        city: {
            type: "string",
        },

        address: {
            type: "string",
        },
        distance: {
            type: "string",
        },
        description: {
            type: "string",
        },
        title: {
            type: "string",
        },
        cheapestPrice: {
            type: "number",
        },
    }

    ,
    errorMessage: {
        required: {
            email: "Please provide an email address",
            name: "Please provide hotel name",

            type: "Please provide hotel type",
            city: "Please provide city name",

            address: "Please provide address",
            distance: "Please provide hotel distance",
            description: "Please provide description of hotel",
            title: "Please provide title",
            cheapestPrice: "Please provide the cheapest price",

        },
        properties: {
            email: "Please provide valid email address",
        }

    },

}

export default {
    createHotel
}