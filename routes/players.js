import { Router } from "express";
import players from '../players.json' with { type: 'json' }
import { validatePlayer, validatePartialPlayer } from '../schemas/players.js'

export const playersRouter = Router()

playersRouter.get('/', (req, res) => {
  const { position } = req.query
  if (position) {
    const filteredPlayers = players.filter(
      player => player.position.toLocaleLowerCase() === position.toLocaleLowerCase()
    )
    return res.json(filteredPlayers)
  }
  res.json(players)
})

playersRouter.get('/:id', (req, res) => {
  const { id } = req.params
  const player = players.find(player => player.id == id)
  if (player) return res.json(player)
  res.status(404).json({ message: 'Player not found' })
})

playersRouter.post('/', (req, res) => {
  const result = validatePlayer(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const newPlayer = {
    id: players.length + 1,
    ...result.data
  }
  players.push(newPlayer)

  res.status(201).json(newPlayer)
})

playersRouter.delete('/:id', (req, res) => {
  const { id } = req.params
  const playerIndex = players.findIndex(player => player.id == id)

  if (playerIndex === -1) {
    return res.status(404).json({ message: 'Player not found' })
  }

  splice(playerIndex, 1)

  return res.json({ message: 'Player deleted' })
})

playersRouter.patch('/:id', (req, res) => {
  const result = validatePartialPlayer(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const { id } = req.params
  const playerIndex = players.findIndex(player => player.id == id)

  if (playerIndex === -1) {
    return res.status(404).json({ message: 'Player not found' })
  }

  const updatePlayer = {
    ...players[playerIndex],
    ...result.data
  }

  players[playerIndex] = updatePlayer

  return res.json(updatePlayer)
})