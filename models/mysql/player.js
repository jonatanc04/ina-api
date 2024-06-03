import mysql from 'mysql2/promise'
import { randomUUID } from 'node:crypto'

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'zentelladb'
}

const connection = await mysql.createConnection(config)

export class PlayerModel {
  static async getAll({ position }) {
    if (position) {
      const lowerCasePosition = position.toLowerCase()
      const [players] = await connection.query(
        'SELECT id, name, nickname, element, gender, position, year, sprite FROM players WHERE LOWER(position) = ?;', [lowerCasePosition]
      )

      if (players.length === 0) return []
    }
    const [players] = await connection.query(
      'SELECT id, name, nickname, element, gender, position, year, sprite FROM players;'
    )

    return players;
  }

  static async getByID({ id }) {
    const [players] = await connection.query(
      'SELECT id, name, nickname, element, gender, position, year, sprite FROM players WHERE id = ?;',
      [id]
    )
    if (players.length === 0) return null

    return players[0]
  }

  static async create({ input }) {
    const uuid = randomUUID()

    try {
      await connection.query(
        `INSERT INTO players (id, name, nickname, element, gender, position, year, sprite) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
        [uuid, input.name, input.nickname, input.element, input.gender, input.position, input.year, input.sprite]
      )
    } catch (e) {
      throw new Error(e)
    }

    const [players] = await connection.query(
      'SELECT id, name, nickname, element, gender, position, year, sprite FROM players WHERE id = ?;',
      [uuid]
    )

    return players[0]
  }

  static async delete({ id }) {
    const [players] = await connection.query(
      'SELECT id, name, nickname, element, gender, position, year, sprite FROM players WHERE id = ?;',
      [id]
    )

    if (players.length === 0) return null

    const deletePlayer = await connection.query('DELETE FROM players WHERE id = ?', [id])

    return players[0]

  }

  static async update({ id, input }) {

    const [players] = await connection.query(
      'SELECT id, name, nickname, element, gender, position, year, sprite FROM players WHERE id = ?;',
      [id]
    )

    if (players.length === 0) return null

    const updatedPlayer = {
      ...players[0],
      ...input
    }

    const updateQuery = `
    UPDATE players
    SET name = ?, nickname = ?, element = ?, gender = ?, position = ?, year = ?, sprite = ?
    WHERE id = ?;`;

    try {
      await connection.query(updateQuery, [
        updatedPlayer.name,
        updatedPlayer.nickname,
        updatedPlayer.element,
        updatedPlayer.gender,
        updatedPlayer.position,
        updatedPlayer.year,
        updatedPlayer.sprite,
        id
      ]);
    } catch (e) {
      throw new Error(e);
    }
  
    return updatedPlayer;

  }
}