const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()

const { getPasswordFromUsername, createNewUser } = require('../db')
const saltRounds = 10

router.post('/signup', (req, res, next) => {
	const { username, password } = req.body

	console.log('username:', username)
	console.log('password:', password)

	bcrypt.hash(password, saltRounds)
		.then(hash => {
			createNewUser(username, hash)
				.then(result => {
					if (result.error) {
						res.send(result)
					} else {
						res.send({ data: result })
					}
				})
				.catch(error => {
					res.status(400)
					res.send({ error: error, type: 'exception' })
				})
		})
		.catch(error => {
			res.status(400)
			res.send({ error: error, type: 'exception' })
		})
})

router.get('/signin', (req, res, next) => {
	const username = decodeURIComponent(req.query.username)
	const password = decodeURIComponent(req.query.password)

	getPasswordFromUsername(username)
		.then(result => {
			if (result.password_hash) {
				bcrypt.compare(password, result.password_hash)
					.then(equal => {
						if (equal) {
							res.send({ data: result })
						} else {
							res.status(401)
							res.send({ error: 'Password is incorrect', type: 'password' })
						}
					})
			} else {
				res.status(400)
				res.send(result)
			}
		})
		.catch(error => {
			res.status(400)
			res.send({ error: error, type: 'exception' })
		})
})

// router.get('/hashit', (req, res, next) => {
// 	const data = decodeURIComponent(req.query.data)

// 	bcrypt.hash(data, saltRounds)
// 		.then(hash => {
// 			res.send({ data: hash })
// 		})
// 		.catch(error => {
// 			res.send({ error: error })
// 		})
// })

// router.get('/compare', (req, res, next) => {
// 	const data = decodeURIComponent(req.query.data)
// 	const plain = decodeURIComponent(req.query.plain)

// 	bcrypt.compare(plain, data)
// 		.then(equal => {
// 			res.send({ data: equal })
// 		})
// 		.catch(error => {
// 			res.send({ error: error })
// 		})
// })

module.exports = router
