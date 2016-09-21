import { composeWithTracker } from 'react-komposer'
import Ingredients from '../../api/ingredients/collection.js'
import IngredientsList from '../pages/Ingredients.js'

const PER_PAGE = 50
let page = 1
let limit = new ReactiveVar(page*PER_PAGE)
let searchVal = new ReactiveVar('')


const loadMoreHandler = () => {
	page += 1
	limit.set(page*PER_PAGE)
}

const onSearchChange = (val) => {
	searchVal.set(val)
}

const composer = (params, onData) => {
	const subscription = Meteor.subscribe('ingredients', limit.get(), searchVal.get())

	if (subscription.ready()) {
		let ingredients = []
		if (searchVal.get()) {
			ingredients = Ingredients.find({}, { sort: {'score' : -1} })
		} else {
			ingredients = Ingredients.find({})
		}
		ingredients = ingredients.fetch()
		onData(null, { ingredients, loadMoreHandler, onSearchChange })
	}
}

export default composeWithTracker(composer)(IngredientsList)
