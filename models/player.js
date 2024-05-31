import players from '../players.json' with { type: 'json' }
import { randomUUID } from 'node:crypto'

export class PlayerModel {
  static async getAll ({ position }) {
    if (position) {
      return players.filter(
        player => player.position.toLocaleLowerCase() === position.toLocaleLowerCase()
      )
    } 
    return players
  }

  static async getByID ({ id }) {
    const player = players.find(player => player.id == id)
    return player
  }

  static async create ({ input }) {
    const newPlayer = {
      id: randomUUID(),
      ...input
    }
    players.push(newPlayer)

    return newPlayer
  }

  static async delete ({ id }) {
    const playerIndex = players.findIndex(player => player.id == id)
    if (playerIndex === -1) return false

    players.splice(playerIndex, 1)
    return true
  }

  static async update ({ id, input }) {
    const playerIndex = players.findIndex(player => player.id == id)
    if (playerIndex === -1) return false

    players[playerIndex] = {
      ...players[playerIndex],
      ...input
    }

    return players[playerIndex]
  }
}