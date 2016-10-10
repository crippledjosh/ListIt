import {Ingredients, MeasurementSchema} from './collection'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { ValidatedMethod } from 'meteor/mdg:validated-method'

const ingredientStateSchema = new SimpleSchema({
	name: { type: String },
	included: { type: Boolean },
	measurement: {
		type: MeasurementSchema
	}
});

export const updateIngredientImage = new ValidatedMethod({
	name: 'ingredients.updateImage',
	validate: new SimpleSchema({
		_id: {type: String},
		image: {type: String}
	})
	.validator(),
	run({_id, image}) {
		return Ingredients.update(_id, { $set: {image} })
	}
});

export const insertIngredient = new ValidatedMethod({
	name: 'ingredients.insert',
	validate: ingredientStateSchema
	.validator(),
	run(ingredient) {
		Object.assign(ingredient, {userId: this.userId});
		if(!ingredient.image){
			ingredient.image = '/ingredient-stock.jpg'
		}
		return Ingredients.insert(ingredient)
	}
});

export const updateIngredient = new ValidatedMethod({
	name: 'ingredients.update',
	validate: new SimpleSchema({
		_id: { type: String },
		update: { type: ingredientStateSchema }
	})
	.validator(),
	run({ _id, update }) {
		if (this.userId !== Ingredients.findOne(_id).userId) {
			throw Meteor.Error('This ingredient does not belong to this user cannot update')
		} else {
			return Ingredients.update(_id, {$set: update})
		}
	}
});

export const removeIngredient = new ValidatedMethod({
	name: 'ingredients.remove',
	validate: new SimpleSchema({
		_id: { type: String }
	})
	.validator(),
	run({ _id }) {
		if (this.userId !== Ingredients.findOne(_id).userId) {
			throw Meteor.Error('This ingredient does not belong to this user cannot delete')
		} else {
			return Ingredients.remove(_id)
		}
	}
});
