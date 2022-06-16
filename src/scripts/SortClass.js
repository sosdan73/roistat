export class Sort {
	constructor(parameter = 'id') {
		this.parameter = parameter;
		this.isReversed = false
	}
	setValues(parameter) {
		if (parameter !== this.parameter) {
			this.constructor(parameter)
		} else if (!this.isReversed) {
			this.isReversed = true
		} else {
			this.constructor()
		}
	}
	getValues() {
		return {
			parameter: this.parameter,
			isReversed: this.isReversed
		}
	}
}