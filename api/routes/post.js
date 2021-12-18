// Import dependencies
const express = require('express')
const router = express.Router()

// Import controller
const postController = require('../controllers/post')

// Set routes
router.delete('/:id', postController.deletePost)
router.post('/', postController.createPost)
router.put('/:id', postController.modifyPost)
router.get('/:id', postController.getOnePost)
router.get('/', postController.getAllPost)

// Export routes
module.exports = router
