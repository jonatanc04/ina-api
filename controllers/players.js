import { PlayerModel } from "../models/local-file-system/player.js";
import { validatePlayer, validatePartialPlayer } from '../schemas/players.js'
//import { PlayerModel } from '../models/mysql/player.js'

export class PlayerController {

  static async getAll (req, res) {
    const { position } = req.query
    const players = await PlayerModel.getAll({ position })
    res.json(players)
  }

  static async getByID (req, res) {
    const { id } = req.params
    const player = await PlayerModel.getByID({ id })
    if (player) return res.json(player)
    res.status(404).json({ message: 'Player not found' })
  }

  static async create (req, res) {
    const result = validatePlayer(req.body)
  
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
  
    const newPlayer =  await PlayerModel.create({ input: result.data })
  
    res.status(201).json(newPlayer)
  }

  static async delete (req, res) {
    const { id } = req.params
    
    const result = await PlayerModel.delete({ id })
  
    if (!result) {
      return res.status(404).json({ message: 'Player not found' })
    }
  
    return res.json({ message: 'Player deleted' })
  }

  static async update (req, res) {
    const result = validatePartialPlayer(req.body)
  
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
  
    const { id } = req.params
    const updatedPlayer = await PlayerModel.update({id, input: result.data})
  
    return res.json(updatedPlayer)
  }
}