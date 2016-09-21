import { composeWithTracker } from 'react-komposer'
import { Meteor } from 'meteor/meteor'
import Recipes  from '../pages/Recipes'

const composer = (props, onData) => {
	onData(null, { })
}

export default composeWithTracker(composer)(Recipes)
