import {  Router } from "express";
import AuthController from "../../Modules/auth/AuthController";


const userRoutes = Router()

userRoutes.post('/register', AuthController.register)
userRoutes.post('/login', AuthController.login)


export {userRoutes}