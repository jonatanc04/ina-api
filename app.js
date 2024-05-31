import express, { json } from 'express'
import cors from 'cors'
import { validatePlayer, validatePartialPlayer } from './schemas/players.js'
import players from './players.json' with { type: 'json'}

const app = express()
app.use(json())
app.use(cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = [
      'http://localhost:8080',
      'http://localhost:3000'
    ]

    if (ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
}))
app.disable('x-powered-by')
app.get('/players', (req, res) => {
  const { position } = req.query
  if (position) {
    const filteredPlayers = players.filter(
     player => player.position.toLocaleLowerCase() === position.toLocaleLowerCase()
    )
    return res.json(filteredPlayers)
  }
  res.json(players)
})

app.get('/players/:id', (req, res) => {
  const { id } = req.params
  const player = players.find(player => player.id == id)
  if (player) return res.json(player)
  res.status(404).json({ message: 'Player not found' })
})

app.post('/players', (req, res) => {
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

app.delete('/players/:id', (req, res) => {
  const { id } = req.params
  const playerIndex = players.findIndex(player => player.id == id)

  if (playerIndex === -1) {
    return res.status(404).json({ message: 'Player not found' })
  }

  splice(playerIndex, 1)

  return res.json({ message: 'Player deleted' })
})

app.patch('/players/:id', (req, res) => {
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

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})