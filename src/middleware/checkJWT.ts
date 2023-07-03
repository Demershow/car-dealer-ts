import {  Request, NextFunction, Response } from "express";
import * as jwt from "jsonwebtoken";


// Check if jsonwebtoken is valid
const verify = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (authHeader && typeof authHeader === "string") {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, `${process.env.JWT_ACCESS_SECRET}`, (err, users) => {
      if (err) {
        res.status(403).json("Token is not valid");
      }
      console.log(users);
      
      next();
    });
  } else {
    return res.status(401).json("Not authenticated");
  }
};

export {verify}