import { Mongo } from 'meteor/mongo'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

export const Ingredients = new Mongo.Collection('Ingredients');

export const MeasurementSchema = new SimpleSchema({
	defaultType: {
		type: String,
		label: 'Measurement type that this ingredient should default to.'
	},
	defaultSubtype: {
		type: String,
		label: 'Measurement subtype that this ingredient should default to.'
	}
});

Ingredients.schema = new SimpleSchema({
	name: {
		type: String,
		label: 'The name of the ingredient.'
	},
	image: {
		type: String,
		label: 'The image related to ingredient.'
	},
	userId: {
		type: String,
		label: 'User that the ingredient is related to'
	},
	included: {
		type: Boolean,
		label: 'Says if the item should be added to shopping lists by default'
	},
	measurement: {
		type: MeasurementSchema,
		label: 'Object representing the measurement defaults of the ingredient'
	}
});

Ingredients.attachSchema(Ingredients.schema);

if(Meteor.isServer){
	Ingredients._ensureIndex({
		'name': 1
	})
}
