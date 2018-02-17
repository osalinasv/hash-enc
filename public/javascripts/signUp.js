const SignUp = {
	name: 'SignUp',
	template: `
		<main id="signup">
			<h3>Sign Up</h3>

			<div class="field">
				<label for="username">Username</label>
				<input type="text" name="username" v-model="username" placeholder="Your username" required/>
			</div>

			<div class="field">
				<label for="password">Password</label>
				<input type="password" name="password" v-model="password" placeholder="Your password" required/>
			</div>

			<button @click="signUp" class="btn solid accent" :disabled="!username || !password">Sign me up</button>

			<div v-if="error" class="dialog error">
				<h4>Error</h4>
				<p>{{ error }}</p>
			</div>

			<div v-if="success" class="dialog success">
				<h4>Success!</h4>
				<p>Signed in correctly, please <router-link to="/signin">go here to sign in</router-link></p>
			</div>
		</main>
	`,
	data() {
		return {
			username: '',
			password: '',
			error: '',
			success: false,
		}
	},
	methods: {
		capitalize(string) {
			return string[0].toUpperCase() + string.slice(1)
		},
		signUp() {
			fetch(api + 'signup', {
				method: 'POST',
				body: JSON.stringify({
					username: this.username,
					password: this.password,
				}), 
				headers: new Headers({
					'Content-Type': 'application/json'
				})
			})
				.then(data => data.json())
				.then(res => {
					if (res.data) {
						this.error = ''
						this.success = true
					}

					if (res.error) {
						this.success = false
						this.error = this.capitalize(res.type) + ': ' + res.error
					}
				})
				.catch((err) => {
					this.error = 'Unexpected: ' + err
				})
		}
	}
}
