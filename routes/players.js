import { Router } from "express";
import { PlayerController } from "../controllers/players.js";

export const createPlayerRouter = ({ playerModel }) => {
  const playersRouter = Router()

  const playerController = new PlayerController({ playerModel })

  playersRouter.get('/', playerController.getAll)
  playersRouter.get('/:id', playerController.getByID)
  playersRouter.post('/', playerController.create)
  playersRouter.delete('/:id', playerController.delete)
  playersRouter.patch('/:id', playerController.update)

  return playersRouter
}