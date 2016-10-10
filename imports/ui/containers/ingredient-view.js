import { composeWithTracker } from 'react-komposer'
import { Meteor } from 'meteor/meteor'
import { Ingredients } from '../../api/ingredients/collection'
import { IngredientView } from '../pages/IngredientView'
import { removeIngredient } from '../../api/ingredients/methods'
import { browserHistory } from 'react-router'

const composer = (props, onData) => {
	const handleDelete = (error) => {
		removeIngredient.call({_id: props.params.id}, error);
		browserHistory.push('/ingredients')
	};
	const subscription = Meteor.subscribe('ingredient', props.params.id);
	if (subscription.ready()) {
		const ingredient = Ingredients.findOne(props.params.id);
		onData(null, { ingredient, handleDelete})
	}
};

export const IngredientViewContainer = composeWithTracker(composer)(IngredientView);
