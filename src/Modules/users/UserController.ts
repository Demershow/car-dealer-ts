import { Request, Response } from "express";
import UserUseCase from "./CreateUserUseCase";

export default class UserController {
  async CreateUser(req: Request, res: Response){
    const {username, email, password} = req.body

    const user_use_case = new UserUseCase()

    const result = await user_use_case.createUser({email, username, password})

    res.status(201).json(result)
  }
}