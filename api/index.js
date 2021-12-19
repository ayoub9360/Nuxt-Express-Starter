// Import dependencies
const express = require('express')
const mongoose = require('mongoose')

// Create express instance
const app = express()

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'))

// Require API routes
// const exempleRoutes = require('./routes/exemple')
const postRoutes = require('./routes/post')
const userRoutes = require('./routes/user')

// Import API Routes
app.use(express.json())
app.use('/post', postRoutes)
app.use('/auth', userRoutes)

// Export express app
module.exports = app

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API server listening on port ${port}`)
  })
}
