import { Mongo } from 'meteor/mongo'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

const Recipes = new Mongo.Collection('Recipes');

const MeasurementSchema = new SimpleSchema({
	type: {
		type: String,
		label: 'The type of the measurement e.g. weight, volume, etc...'
	},
	subtype: {
		type: String,
		label: 'The default subtype type of the measurement e.g. grams, kilograms, ounces, etc...'
	},
	amount: {
		type: Number,
		label: 'The amount of the ingredient required relative to the measurement type and subtype'
	}
});

const IngredientSchema = new SimpleSchema({
	name: {
		type: String,
		label: 'The name of the ingredient'
	},
	'ingredient.id': {
		type: String,
		label: 'The id of the ingredient in the Ingredient Collection'
	},
	measurement: {
		type: MeasurementSchema,
		label: 'The amount of the ingredient required for the recipe'
	}
});

Recipes.schema = new SimpleSchema({
	ingredients: {
		type: [IngredientSchema],
		label: 'The list of ingredients required for the meal'
	},
	method: {
		type: String,
		label: 'The method used for the recipe.'
	},
	userId: {
		type: String,
		label: 'User that the ingredient is related to'
	},
	image: {
		type: String,
		label: 'Image of the meal the recipe is for.'
	}
});

Recipes.attachSchema(Recipes.schema);

export default Recipes
