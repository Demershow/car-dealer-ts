import { IUserDTO } from "./DTO/UserDTO";
import prisma from '../../prisma'
import bcrypt from 'bcrypt'
import { verifyIfUserAlreadyExists } from "../../helpers/verifyUser";
import { Request, Response } from "express";
import * as jwt from 'jsonwebtoken'

 class UserUseCase {
  async createUser(req:Request, res:Response, user_data: IUserDTO) {    
    const userAlreadyExists = await verifyIfUserAlreadyExists(user_data.email)

    if(userAlreadyExists){
      res.status(400).json('User already exists')
    }

    let salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(user_data?.password, salt)
    const user = await prisma.user.create({ data: { email: user_data.email, username: user_data.username, password: hashPassword } })
    const token = jwt.sign({ email: user_data.email }, `${process.env.JWT_ACCESS_SECRET}`, { expiresIn: '1h' })
    
    return{token}
  }
}

export default new UserUseCase