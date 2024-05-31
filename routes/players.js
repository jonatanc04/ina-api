import { Router } from "express";
import { PlayerController } from "../controllers/players.js";

export const playersRouter = Router()

playersRouter.get('/', PlayerController.getAll)

playersRouter.get('/:id', PlayerController.getByID)

playersRouter.post('/', PlayerController.create)

playersRouter.delete('/:id', PlayerController.delete)

playersRouter.patch('/:id', PlayerController.update)