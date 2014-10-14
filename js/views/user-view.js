var app = app || {};

(function() {
	app.UserEditView = Backbone.View.extend({
		tagName: 'div',

		events: {
			'submit form': 'submitClicked'
		},

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
		},

		template: _.template($('#edit-contact').html()),

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});
})();