import { Meteor } from 'meteor/meteor'
import { Ingredients } from '../collection'

Meteor.publish('ingredients', function(limit = 50, searchValue) {
	check(limit, Number);
	check(searchValue, Match.OneOf(String, undefined, null));

	let query = {userId: this.userId},
		projection = {limit, sort:{name: 1}};

	if (searchValue) {
		query.name = new RegExp( searchValue, 'i' );
		projection.fields = {score: { $meta: 'textScore' }};
		projection.sort = {score: { $meta: 'textScore' }}
	}

	return Ingredients.find(query, projection)
});

Meteor.publish('ingredient', function(id) {
	check(id, String);

	let query = {userId: this.userId, _id:id};

	return Ingredients.find(query)
});

