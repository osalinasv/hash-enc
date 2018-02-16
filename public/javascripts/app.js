const api = 'https://hash-enc.herokuapp.com/api/';
// const api = 'http://localhost:3000/api/';

const app = new Vue({
	el: '#app',
	data() {
		return ({
			data: '',
			hashData: '',
			output: '',
			outputTag: '',
		})
	},
	computed: {
		processedData() {
			return this.data.trim()
		}
	},
	methods: {
		hash() {
			if (!this.processedData) return

			this.hashData = ''

			fetch(api + 'hashit/?data=' + encodeURIComponent(this.processedData))
				.then(data => data.json())
				.then(parsed => {
					const { data, error } = parsed

					if (data) {
						this.hashData = data
					} else {
						this.outputTag = 'An error ocurred while hashing'

						if (error) {
							this.output = 'Error: ' + error
						} else {
							this.output = 'Unexpected error'
						}
					}
				})
				.catch(error => {
					this.outputTag = 'An error ocurred while hashing'
					this.output = 'Error: ' + error
				})
		},
		compare() {
			fetch(api + 'compare/?data=' + encodeURIComponent(this.hashData) + '&plain=' + encodeURIComponent(this.processedData))
				.then(data => data.json())
				.then(parsed => {
					const { data, error } = parsed

					if (data != null) {
						this.outputTag = 'Comparison result'
						this.output = 'This data-hash pair DOES ' + (data ? '' : 'NOT ') + 'correspond';
					} else {
						this.outputTag = 'An error ocurred while comparing'

						if (error) {
							this.output = 'Error: ' + error
						} else {
							this.output = 'Unexpected error'
						}
					}
				})
				.catch(error => {
					this.outputTag = 'An error ocurred while comparing'
					this.output = 'Error: ' + error
				})
		}
	}
});
