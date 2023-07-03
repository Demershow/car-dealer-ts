import { Request, Response } from "express";
import UserUseCase from "./CreateUserUseCase";
import { IUserDTO } from "./DTO/UserDTO";
import FindUser from "../../helpers/findUserByJwt";

class UserController {
  async editUser(req:Request, res:Response, user_data: IUserDTO) {
    FindUser(req, res)

    res.send(user_data.username)
  }
}

export default new UserController