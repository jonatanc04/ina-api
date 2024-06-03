import { createApp } from "./app.js";
import { PlayerModel } from "./models/local-file-system/player.js"

createApp({ playerModel: PlayerModel })