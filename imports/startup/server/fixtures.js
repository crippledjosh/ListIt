import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

const users = [{
	email: 'admin@admin.com',
	password: 'password',
	profile: {
		name: { first: 'Joshua', last: 'Marks' },
	},
}]

users.forEach(({ email, password, profile }) => {
	const userExists = Meteor.users.findOne({ 'emails.address': email })

	if (!userExists) {
		Accounts.createUser({ email, password, profile })
	}
})
