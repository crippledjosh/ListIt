import { Meteor } from 'meteor/meteor'
import Measurements from '../collection'

Meteor.publish('measurements', function() {
	return Measurements.find({})
})

