import { validatePlayer, validatePartialPlayer } from '../schemas/players.js'

export class PlayerController {

  constructor ({ playerModel }) {
    this.playerModel = playerModel
  }

  getAll = async (req, res) => {
    const { position } = req.query
    const players = await this.playerModel.getAll({ position })
    res.json(players)
  }

  getByID = async (req, res) => {
    const { id } = req.params
    const player = await this.playerModel.getByID({ id })
    if (player) return res.json(player)
    res.status(404).json({ message: 'Player not found' })
  }

  create = async (req, res) => {
    const result = validatePlayer(req.body)
  
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
  
    const newPlayer =  await this.playerModel.create({ input: result.data })
  
    res.status(201).json(newPlayer)
  }

  delete = async (req, res) => {
    const { id } = req.params
    
    const result = await this.playerModel.delete({ id })
  
    if (!result) {
      return res.status(404).json({ message: 'Player not found' })
    }
  
    return res.json({ message: 'Player deleted' })
  }

  update = async (req, res) => {
    const result = validatePartialPlayer(req.body)
  
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
  
    const { id } = req.params
    const updatedPlayer = await this.playerModel.update({id, input: result.data})
  
    return res.json(updatedPlayer)
  }
}