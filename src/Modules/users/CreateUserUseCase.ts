import { ICreateUserDTO } from "./DTO/CreateUserDTO";
import prisma from '../../prisma'
import bcrypt from 'bcrypt'

export default class UserUseCase {
  async createUser(user_data: ICreateUserDTO) {
    let salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(user_data.password || '', salt)
    // verify if user already exists.
    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email: user_data.email
      }
    })



    //if exists, return error, if not, make the bcrypt to password
    const client = await prisma.user.create({data: {email: user_data.email, user_name: user_data.username, password: hashPassword }})
    return client
  }
}