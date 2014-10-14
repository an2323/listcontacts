var app = app || {};

(function(){
	app.UserItemView = Backbone.View.extend({
		tagName: 'tr',

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
		},

		template: _.template($('#item-contact').html()),

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});
})();
