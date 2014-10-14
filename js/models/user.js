var app = app || {};

(function() {
	app.userStorage = app.userStorage || new Backbone.LocalStorage('users');
	
	app.User = Backbone.Model.extend({
		urlRoot: '/users',
		localStorage: app.userStorage,

		defaults: {
			name: '',
			age: 0,
			email: ''
		}
	});
})();
