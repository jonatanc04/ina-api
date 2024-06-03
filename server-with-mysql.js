import { createApp } from "./app.js";
import { PlayerModel } from './models/mysql/player.js'

createApp({ playerModel: PlayerModel })