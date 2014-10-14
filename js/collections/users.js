var app = app || {};

(function() {
	app.userStorage = app.userStorage || new Backbone.LocalStorage('users');
	
	app.UserCollection = Backbone.Collection.extend({
		model: app.User,
		url: '/users',
		localStorage: app.userStorage
	});
})();

