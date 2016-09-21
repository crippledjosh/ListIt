import Ingredients from '../collection.js'
import IngredientGenerator from '../../../modules/ingredient-generator'


const userId = Meteor.users.findOne({'emails.0.address': 'admin@admin.com'})._id

let data = IngredientGenerator(200)
Meteor.startup(() => {
	if(!Ingredients.find({}).count()){
		data.forEach(function (ingredient) {
			const {name, image} = ingredient
			Ingredients.insert({
				name,
				image,
				userId,
				measurement:{
					defaultType: 'Volume',
					defaultSubtype: 'ml'
				}
			})
		})
	}
})
