//external imports
import { Router } from "express";

//Internal imports\

//middlewares
import auth from "../middlewares/auth"
import validate from "../middlewares/validate.middleware";


//controller
import hotelController from "../controllers/hotel.controller";

//validator
import hotelValidation from "../validations/hotel.validation";

const hotelRoute = Router();

hotelRoute
    .route("/").post(validate(hotelValidation.createHotel), hotelController.createHotel)
    .get(auth("getAllHotels"), hotelController.getHotelsBySuperAdmin)

hotelRoute
    .route("/:adminId")
    .get(auth("getHotels"), hotelController.getHotelsByAdmin)

hotelRoute
    .route("/:adminId/:hotelId")
    .get(auth("getHotel"), hotelController.getHotelsByHotelId)
    .put(auth("updateHotel"), hotelController.updateHotelByHotelId)
    .delete(auth("deleteHotel"), hotelController.deleteHotelByHotelId)




export default hotelRoute;

