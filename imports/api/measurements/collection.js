import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Measurements = new Mongo.Collection('Measurements');

const SubtypeSchema = new SimpleSchema({
	name: {
		type: String,
		label: 'The image related to ingredient.'
	},
	value_in_standard_units: {
		type: Number,
		decimal: true,
		label: 'The number of standard_units that fit in this subtype e.g. for type weight with standard_unit of grams the value_in_standard_unit of subtype kilgram would be 1000.'
	},
});

Measurements.schema = new SimpleSchema({
	name: {
		type: String,
		label: 'The name of the ingredient.'
	},
	subtypes: {
		type: [SubtypeSchema],
		label: 'The list of subtypes related to a type of measurement e.g. grams, kilograms, pounds for type weight.'
	},
	standard_unit:{
		type: String,
		label: 'This is the unit that is used to compare all other subtypes to each other'
	}
});

Measurements.attachSchema(Measurements.schema);
