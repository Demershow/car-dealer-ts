import { Request, Response } from "express";
import * as jwt from 'jsonwebtoken'
import prisma from "../prisma";


export default async function FindUser(req: Request, res: Response) {
  if (req.headers && req.headers.authorization) {
    var authorization = req.headers.authorization.split(' ')[1],
      decoded;
    try {
      decoded = jwt.verify(authorization, `${process.env.JWT_ACCESS_SECRET}`);
    } catch (e) {
      return res.status(401).send('unauthorized');
    }
    console.log(decoded);
    
    const user = await prisma.user.findUnique({where: {email: 'demersontorres520@gmail.com'}})
    res.send(user)
  }
}