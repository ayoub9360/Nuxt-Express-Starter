const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.signup = (req, res, next) => {
  //* Crypt the password
  const { email, password } = req.body
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      //* Then create the new user
      const user = new User({
        email,
        password: hash,
      })
      //* Save the user in the database
      user
        .save()
        .then(() => res.status(201).json({ message: 'User created !' }))
        .catch((error) => res.status(400).json({ error }))
    })
    .catch((error) => res.status(500).json({ error }))
}

exports.login = (req, res, next) => {
  //* Get the user from the database
  const { email, password } = req.body
  User.findOne({ email })
    .then((user) => {
      //* Check if the user exists
      if (!user) return res.status(401).json({ error: 'User not found' })
      //* if the user exists check if the password is correct
      bcrypt
        .compare(password, user.password)
        .then((valid) => {
          //* If the password is correct return the user with the token else return invalid password
          if (!valid) return res.status(401).json({ error: 'Invalid password' })
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, { expiresIn: '24h' }),
          })
        })
        .catch((error) => res.status(500).json({ error }))
    })
    .catch((error) => res.status(500).json({ error }))
}
