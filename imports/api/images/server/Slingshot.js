import {Slingshot} from 'meteor/edgee:slingshot'

Slingshot.fileRestrictions('Images', {
	allowedFileTypes: ['image/png', 'image/jpeg', 'image/jpg'],
	maxSize: 2 * 500 * 5000 // 2 MB (use null for unlimited)
})


Slingshot.createDirective('Images', Slingshot.S3Storage, {
	bucket: 'listit-image-upload', // change this to your s3's bucket name
	region: 'eu-west-1', //Region code (The default would be 'iad3')
	acl: 'public-read',
	
	authorize: function (file, metaContext) {
		
		//Deny uploads if user is not logged in.
		if (!this.userId) {
			var message = 'Please login before posting files'
			throw new Meteor.Error('Login Required', message)
		}

		return true
	},

	key: function (file, metaContext) {
		// User's image url with ._id attached:

		return metaContext.avatarId + '/' + Date.now() + '-' + file.name
	}
})