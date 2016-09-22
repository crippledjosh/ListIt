import $ from 'jquery'
import 'jquery-validation'
import {insertIngredient, updateIngredient} from '../api/ingredients/methods'
import { Bert } from 'meteor/themeteorchef:bert'

let component

const updateIngredientCall = (ingredientState) =>{
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

const insertIngredientCall = (ingredientState) => {
	insertIngredient.call(ingredientState, (error) => {
		if (error) {
			Bert.alert(error.reason, 'warning')
		} else {
			Bert.alert('Ingredient Added!', 'success')
			component.setState({ showModal: false })
		}
	})
}

const getIngredientState = () => {
	const name = component.state.name
	const included = component.state.included
	const defaultType = component.state.measurementType.name
	const defaultSubtype = component.state.measurementSubtype.name
	const measurement = {defaultType, defaultSubtype}
	return {name, included, measurement}
}

const upsertIngredient = (ingredientState) => {
	if(component.props.creating){
		insertIngredientCall(ingredientState)
	}
	else{
		updateIngredientCall(ingredientState)
	}
}
const uploadResolve = (downloadUrl) => {
	debugger
	this.setState({fileName: downloadUrl})
}
const uploadReject = (error, response) => {
	debugger
	console.error('Error uploading', response)
	alert (error) // you may want to fancy this up when you're ready instead of a popup.
}

const addIngredient = () => {
	
	const image = component.state.image
	const uploader = component.refs.imageUploader
	const ingredientState = getIngredientState()
	if(image){
		uploader.upload().then(uploadResolve, uploadReject)
	}
	else {
		upsertIngredient(ingredientState)
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
