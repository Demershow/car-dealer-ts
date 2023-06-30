import { Router } from "express";
import UserController from "../../Modules/users/UserController";

const user_controller = new UserController

const userRoutes = Router()

userRoutes.post('/', user_controller.CreateUser)


export {userRoutes}