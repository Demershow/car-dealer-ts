import { Request, Response, Router } from "express";
import { userRoutes } from "./userRoutes";

const routes = Router()

routes.use('/users', userRoutes)
routes.get('/', (req: Request, res: Response) => {
  res.send('API is Running')
})

export default routes