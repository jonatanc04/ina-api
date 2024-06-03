import express, { json } from 'express'
import { createPlayerRouter } from './routes/players.js'
import { corsMiddleware } from './middlewares/cors.js'

export const createApp = ({ playerModel }) => {
  const app = express()
  app.use(json())
  app.use(corsMiddleware())
  app.disable('x-powered-by')
  
  app.use('/players', createPlayerRouter({playerModel}))
  
  const PORT = process.env.PORT ?? 3000
  
  app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
  })
}