import { composeWithTracker } from 'react-komposer'
import { Recipes }  from '../pages/Recipes'

const composer = (props, onData) => {
	onData(null, { })
};

export const RecipesContainer = composeWithTracker(composer)(Recipes);
