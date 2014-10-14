var app = app || {};

(function() {
	app.Router = Backbone.Router.extend({
		routes: {
			"":               "listUsers",
			"users":          "listUsers",
			"users/:id/edit": "editUser",
			"users/new":      "newUser"
		},
		listUsers: function() {
			var users = new app.UserCollection();
			var view  = new app.UserListView({collection: users});
			$('#wrapper').empty().append(view.render().$el);
			users.fetch({reset: true});
		},
		editUser: function(id) {
			var user = new app.User({id: id});
			user.fetch({success: function() {
				var view = new app.UserEditView({model: user});
				$('#wrapper').empty().append(view.render().$el);
			}});
		},
		newUser: function() {
			var user = new app.User();
			var view = new app.UserEditView({model: user});
			$('#wrapper').empty().append(view.render().$el);
		}
	});
})();

