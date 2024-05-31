import { Router } from "express";
import { validatePlayer, validatePartialPlayer } from '../schemas/players.js'
import { PlayerModel } from "../models/player.js";

export const playersRouter = Router()

playersRouter.get('/', async (req, res) => {
  const { position } = req.query
  const players = await PlayerModel.getAll({ position })
  res.json(players)
})

playersRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  const player = await PlayerModel.getByID({ id })
  if (player) return res.json(player)
  res.status(404).json({ message: 'Player not found' })
})

playersRouter.post('/', async (req, res) => {
  const result = validatePlayer(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const newPlayer =  await PlayerModel.create({ input: result.data })

  res.status(201).json(newPlayer)
})

playersRouter.delete('/:id', async (req, res) => {
  const { id } = req.params
  
  const result = await PlayerModel.delete({ id })

  if (!result) {
    return res.status(404).json({ message: 'Player not found' })
  }

  return res.json({ message: 'Player deleted' })
})

playersRouter.patch('/:id', async (req, res) => {
  const result = validatePartialPlayer(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const { id } = req.params
  const updatedPlayer = await PlayerModel.update({id, input: result.data})

  return res.json(updatedPlayer)
})