const SignIn = {
	name: 'SignIn',
	template: `
		<main id="signin">
			<h3>Sign In</h3>

			<div class="field">
				<label for="username">Username</label>
				<input type="text" name="username" v-model="username"  placeholder="Your username" required/>
			</div>

			<div class="field">
				<label for="password">Password</label>
				<input type="password" name="password" v-model="password"  placeholder="Your password" required/>
			</div>

			<button @click="signIn" class="btn solid accent" :disabled="!username || !password">Enter</button>

			<div v-if="error" class="dialog error">
				<h4>Error</h4>
				<p>{{ error }}</p>
			</div>

			<div v-if="success" class="dialog success">
				<h4>Success!</h4>
				<p>Signed in correctly, {{ success }}</p>
				<p class="hashed">{{ hashed }}</p>
				<p>(why am I showing you this?)</p>
			</div>
		</main>
	`,
	data() {
		return {
			username: 'DummyDude',
			password: 'password',
			error: '',
			success: '',
			hashed: '',
		}
	},
	methods: {
		capitalize(string) {
			return string[0].toUpperCase() + string.slice(1)
		},
		signIn() {
			fetch(api + 'signin/?username=' + encodeURIComponent(this.username) + '&password=' + encodeURIComponent(this.password))
				.then(data => data.json())
				.then(res => {
					if (res.data) {
						this.error = ''
						this.hashed =  res.data.password_hash
						this.success = 'You are user number ' + res.data.id + ' and your hashed password is:'
					}

					if (res.error) {
						this.hashed = ''
						this.success = ''
						this.error = this.capitalize(res.type) + ': ' + res.error
					}
				})
				.catch((err) => {
					this.error = 'Unexpected: ' + err
				})
		}
	}
}
