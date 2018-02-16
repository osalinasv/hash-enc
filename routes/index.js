const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')
const saltRounds = 10

router.get('/hashit', (req, res, next) => {
	const data = decodeURIComponent(req.query.data)

	bcrypt.hash(data, saltRounds)
		.then(hash => {
			res.send({ data: hash })
		})
		.catch(error => {
			res.send({ error: error })
		})
})

router.get('/compare', (req, res, next) => {
	const data = decodeURIComponent(req.query.data)
	const plain = decodeURIComponent(req.query.plain)

	bcrypt.compare(plain, data)
		.then(equal => {
			res.send({ data: equal })
		})
		.catch(error => {
			res.send({ error: error })
		})
})

module.exports = router
