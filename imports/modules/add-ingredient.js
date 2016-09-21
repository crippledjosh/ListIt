import $ from 'jquery'
import 'jquery-validation'
import {insertIngredient} from '../api/ingredients/methods'
import { Bert } from 'meteor/themeteorchef:bert'
import { getInputValue } from './get-input-value'

let component

const addIngredient = () => {
	const name = getInputValue(component.refs.name.refs.input)
	const included = component.state.included
	const image = getInputValue(component.refs.image.refs.input)
	const defaultType = component.state.measurementType.name
	const defaultSubtype = component.state.measurementSubtype.name
	const measurement = {defaultType, defaultSubtype}
	console.log(measurement)
	insertIngredient.call({name, included, image, measurement}, (error) => {
		if (error) {
			Bert.alert(error.reason, 'warning')
		} else {
			Bert.alert('Ingredient Added!', 'success')
			component.setState({ showModal: false })
		}
	})
}

const validate = () => {
	$(component.refs.addIngredient).validate({
		rules:
		{
			name: {
				required: true
			},
		},
		messages: 
		{
			name: {
				required: 'Need a namehere.'
			}
		},
		submitHandler() { addIngredient() }
	})
}

export default (options) => {
	component = options.component
	validate()
}
