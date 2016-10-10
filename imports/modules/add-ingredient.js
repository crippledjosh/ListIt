import $ from 'jquery'
import 'jquery-validation'
import {insertIngredient, updateIngredient, updateIngredientImage} from '../api/ingredients/methods'
import { Bert } from 'meteor/themeteorchef:bert'

let component;

const update = (ingredientState) =>{
	const updateObject = {};
	updateObject.update = ingredientState;
	updateObject._id = component.props.ingredient._id;
	updateIngredient.call(updateObject, (error) => {
		if (error) {
			Bert.alert(error.reason, 'warning')
		} else {
			Bert.alert('Ingredient updated!', 'success');
			component.setState({ showModal: false })
		}
	});
	return updateObject._id
};

const insert = (ingredientState) => {
	return insertIngredient.call(ingredientState, (error) => {
		if (error) {
			Bert.alert(error.reason, 'warning')
		} else {
			Bert.alert('Ingredient Added!', 'success');
			component.setState({ showModal: false })
		}
	})
};

const getState = () => {
	const name = component.state.name;
	const included = component.state.included;
	const defaultType = component.state.measurementType.name;
	const defaultSubtype = component.state.measurementSubtype.name;
	const measurement = {defaultType, defaultSubtype};
	return {name, included, measurement}
};

const upsert = (ingredientState) => {
	if(component.props.creating){
		return insert(ingredientState)
	}
	else{
		return update(ingredientState)
	}
};


const add = () => {

	const image = component.state.image;
	const uploader = component.refs.imageUploader;
	const ingredientState = getState();
	const _id = upsert(ingredientState);

	const uploadResolve = (downloadUrl) => {
		updateIngredientImage.call({_id, image:downloadUrl});
		Bert.alert('Image set!', 'success');
		component.forceUpdate()
	};

	const uploadReject = (error) => {
		if (error && error.reason) {
			Bert.alert(error.reason, 'warning')
		}
	};

	if(image){
		if(_id != 1){
			uploader.upload({_id}).then(uploadResolve, uploadReject)
		}
	}
};

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
		submitHandler() { add() }
	})
};

export const submitIngredient = (options) => {
	component = options.component;
	validate();
};
