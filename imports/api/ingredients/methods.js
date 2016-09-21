import Ingredients, {MeasurementSchema} from './collection'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { ValidatedMethod } from 'meteor/mdg:validated-method' 

const ingredientStateSchema = new SimpleSchema({
	name: { type: String },
	included: { type: Boolean },
	image: { type: String },
	measurement: {
		type: MeasurementSchema
	}
})


export const insertIngredient = new ValidatedMethod({
	name: 'ingredients.insert',
	validate: ingredientStateSchema
	.validator(),
	run(ingredient) {
		Object.assign(ingredient, {userId: this.userId})
		if(!ingredient.image){
			ingredient.image = '/ingredient-stock.jpg'
		}
		Ingredients.insert(ingredient)
	}
})

export const updateIngredient = new ValidatedMethod({
	name: 'ingredients.update',
	validate: new SimpleSchema({
		_id: { type: String },
		update: { type: ingredientStateSchema }
	})
	.validator(),
	run({ _id, update }) {
		if(this.userId === Ingredients.findOne(_id).userId){
			Ingredients.update(_id, { $set: update })      
		}
	}
})

export const removeIngredient = new ValidatedMethod({
	name: 'ingredients.remove',
	validate: new SimpleSchema({
		_id: { type: String }
	})
	.validator(),
	run({ _id }) {
		if(this.userId === Ingredients.findOne(_id).userId){
			Ingredients.remove(_id)
		}
	}
})
