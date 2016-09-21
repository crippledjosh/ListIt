import $ from 'jquery'
import 'jquery-validation'
import {insertIngredient, updateIngredient} from '../api/ingredients/methods'
import { Bert } from 'meteor/themeteorchef:bert'
import { getInputValue } from './get-input-value'

let component

const addIngredient = () => {
	const name = component.state.name
	const included = component.state.included
	const image = component.state.image
	const defaultType = component.state.measurementType.name
	const defaultSubtype = component.state.measurementSubtype.name
	const measurement = {defaultType, defaultSubtype}
	const ingredientState = {name, included, image, measurement}
	if(component.props.creating){
		insertIngredient.call(ingredientState, (error) => {
			if (error) {
				Bert.alert(error.reason, 'warning')
			} else {
				Bert.alert('Ingredient Added!', 'success')
				component.setState({ showModal: false })
			}
		})
	}
	else{
		const updateObject = {}
		updateObject.update = ingredientState
		updateObject._id = component.props.ingredient._id
		updateIngredient.call(updateObject, (error) => {
			if (error) {
				Bert.alert(error.reason, 'warning')
			} else {
				Bert.alert('Ingredient updated!', 'success')
				component.setState({ showModal: false })
			}
		})
	}
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
