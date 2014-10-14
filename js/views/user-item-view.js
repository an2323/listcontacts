var app = app || {};

(function(){
	app.UserView = Marionette.ItemView.extend({
		tagName:  'tr',
		template: '#item-contact',
		events: {
			'click .remove': 'removeClicked',
			'click .edit':   'editClicked'
		},

		removeClicked: function(ev) {
			ev.preventDefault();
			this.remove();
			this.model.destroy();
		},

		editClicked: function(ev) {
			ev.preventDefault();
			Backbone.history.navigate("users/" + this.model.get('id') + "/edit");
			$('#wrapper').empty().append(new app.UserEditView({model: this.model}).render().$el);
		}
	});
})();

