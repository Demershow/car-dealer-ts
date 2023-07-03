
import { Request, Response } from "express";
import UserUseCase from "../users/CreateUserUseCase";
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { verifyIfUserAlreadyExists } from "../../helpers/verifyUser";

class AuthController {

  async register(req: Request, res: Response) {
    const {
      email,
      password,
      username,
    } = req.body;
    const user_created = await UserUseCase.createUser(req, res, { email, password, username })


    return res.status(201).json(user_created);
  }

  async login(req: Request, res: Response) {

    const { email, password } = req.body
    const user = await verifyIfUserAlreadyExists(email)

    if (user) {
      if (await bcrypt.compare(password, user.password)) {

        const token = jwt.sign({ email: user.email }, `${process.env.JWT_ACCESS_SECRET}`, { expiresIn: '1h' })
        return res.json({ token })
      } else {

        res.status(401).json('Email or password incorrect')
      }
    } else {

      res.status(404).json('User not found')
    }

  }
}

export default new AuthController;