const R = require('ramda')
const bcrypt = require('bcrypt')

const crypto = require('./crypto')
const { User } = require('../models')

const serializeUsers = users =>
  users
    .map(user => user.get({ plain: true }))
    .map(R.omit(['password']))

const getUsers = () =>
  User
    .findAll({})
    .then(serializeUsers)

const createUser = user =>
  bcrypt.hash(user.password, 10).
    then(hashed => User.create({
      ...user,
      password: hashed
    }))

// crypto
//   .hash(user.password)
//   .then(hash => User.create({
//     ...user,
//     password: hash,
//   }))

const findByEmail = email =>
  User.findOne({ where: { email } })

module.exports = {
  getUsers,
  createUser,
  findByEmail,
}
