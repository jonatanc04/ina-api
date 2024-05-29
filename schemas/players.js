const z = require('zod')

const playerSchema = z.object({
  name: z.string({
    invalid_type_error: 'Player name must be a string',
    required_error: 'Player name is required.'
  }),
  nickname: z.string({
    invalid_type_error: 'Player nickname must be a string',
  }),
  position: z.string({
    invalid_type_error: 'Movie position must be a string',
    required_error: 'Player position is required.'
  }),
  sprite: z.string().url({
    message: 'Poster must be a valid URL'
  })
})

function validatePlayer (input) {
  return playerSchema.safeParse(input)
}

function validatePartialPlayer (input) {
  return playerSchema.partial().safeParse(input)
}

module.exports = {
  validatePlayer,
  validatePartialPlayer
}