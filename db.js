const sqlite = require('sqlite')

const dbPromise = Promise.resolve()
	.then(() => sqlite.open('./db/database.sqlite', { Promise, cached: true }))
	// .then(db => db.migrate({ force: 'last', migrationsPath: './db/migrations' }))
	.then(db => db.migrate({ migrationsPath: './db/migrations' }))

const getDatabase = async () => await dbPromise

const getUserByUsername = async (username, selection = '*') => {
	try {
		const db = await getDatabase()
		const result = await db.get('SELECT ' + selection + ' FROM user WHERE username = \"' + username + '\"')

		return result || { error: 'There is no user with username ' + username, type: 'username' }
	} catch (err) {
		return { error: 'Exception getting user data', type: 'exception' }
	}
}

const getPasswordFromUsername = async (username) => {
	try {
		const db = await getDatabase()
		const result = await getUserByUsername(username, 'id, password_hash')

		return result || { error: 'There is no user with name ' + username, type: 'username' }
	} catch (err) {
		return { error: 'Exception getting password from user ' + username, type: 'exception' }
	}
}

const createNewUser = async (username, password) => {
	try {
		const db = await getDatabase()
		const exists = await getUserByUsername(username, 'username')

		if (exists && username === exists.username)
			return { error: 'User ' + username + ' already exists', type: 'username' }

		const create = await db.run('INSERT INTO user VALUES (null, ?, ?)', [username, password])

		if (create != null && create.lastID >= 0) {
			const check = await getUserByUsername(username)
			return check || { error: 'User with name ' + username + ' is somehow missing', type: 'username' }
		}

		return { error: 'Exception creating user with username ' + username, type: 'exception' }
	} catch (err) {
		return { error: 'Exception creating user with username ' + username, type: 'exception' }
	}
}

module.exports = {
	getDatabase,
	getPasswordFromUsername,
	createNewUser,
}
