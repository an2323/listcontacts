var app = app || {};

(function() {
	app.UserEditView = Marionette.ItemView.extend({
		tagName: 'div',

		events: {
			'submit form': 'submitClicked'
		},

		template: '#edit-contact',

		submitClicked: function(ev) {
			//Backbone Syphon plugin
			ev.preventDefault();
			var data = {};
			this.$("input[type!='submit']").each(function() {
			    data[$(this).attr("name")] = $(this).val();
			});
			this.model.set(data);
			this.model.save().done(function() {
				var users = new app.UserCollection();
				var view  = new app.UserListView({collection: users});
				$('#wrapper').empty().append(view.render().$el);

				users.fetch({reset: true}).done(function() {
					Backbone.history.navigate("users");				
				});
			});
		}
	});
})();

