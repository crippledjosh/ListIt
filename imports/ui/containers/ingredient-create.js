import { composeWithTracker } from 'react-komposer'
import { Meteor } from 'meteor/meteor'
import { IngredientCreate }  from '../components/IngredientCreate'
import { Measurements } from '../../api/measurements/collection'

const composer = (props, onData) => {
	const subscription = Meteor.subscribe('measurements');

	if (subscription.ready()) {
		const measurements = Measurements.find({}).fetch();
		const ingredient = props.ingredient;
		const creating = !ingredient;
		const buttonClass = props.buttonClass;
		onData(null, { measurements, creating, ingredient, buttonClass })
	}
};

export const IngredientCreateContainer = composeWithTracker(composer)(IngredientCreate);
