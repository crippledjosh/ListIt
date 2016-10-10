import {Ingredients} from '../collection.js'
import IngredientGenerator from '../../../modules/ingredient-generator'

Meteor.startup(() => {
	if(!Ingredients.find({}).count()){
		const userId = Meteor.users.findOne({'emails.0.address': 'admin@admin.com'})._id;
		let data = IngredientGenerator(200);
		data.forEach(function (ingredient) {
			const {name, image} = ingredient;
			Ingredients.insert({
				name,
				image,
				userId,
				included:true,
				measurement:{
					defaultType: 'Volume',
					defaultSubtype: 'ml'
				}
			})
		})
	}
});
