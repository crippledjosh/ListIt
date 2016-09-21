import Measurements from '../collection.js'

const data = [
	{
		name: 'Volume',
		subtypes: [
			{
				name: 'ml',
				value_in_standard_units: 1
			},
			{
				name: 'cl',
				value_in_standard_units: 10
			},
			{
				name: 'l',
				value_in_standard_units: 1000
			},
			{
				name: 'tablespoon',
				value_in_standard_units: 17
			},
			{
				name: 'teaspoon',
				value_in_standard_units: 5.919
			},
			{
				name: 'cup',
				value_in_standard_units: 250
			},
		],
		standard_unit:'ml'
	},
	{
		name: 'Weight',
		subtypes: [
			{
				name: 'grams',
				value_in_standard_units: 1
			},
			{
				name: 'kilograms',
				value_in_standard_units: 1000
			},
			{
				name: 'pounds',
				value_in_standard_units: 453.592
			}
		],
		standard_unit: 'grams'
	}
]


Meteor.startup(() => {
	if(!Measurements.find({}).count()){
		data.forEach(function (measurement) {
			Measurements.insert(measurement)
		})
	}
})
