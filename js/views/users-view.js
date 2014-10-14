var app = app || {};

(function(){
	app.UserListView = Backbone.View.extend({
		tagName: 'div',

		className: 'row',

		template: _.template($('#list-contact').html()),

		events: {
			'click .add': 'addClicked'
		}, 

		addClicked: function(ev) {
			ev.preventDefault();
			Backbone.history.navigate("users/new");
			$('#wrapper').empty().append(new app.UserEditView({model: new app.User()}).render().$el);		
		},

		emptyView: false, 

		initialize: function(options) {
			this.colleciton = options.collection;
			this.listenTo(this.colleciton, 'all',    this.isEmptyUsers);
			this.listenTo(this.colleciton, 'remove', this.removeUser);
			this.listenTo(this.colleciton, 'reset',  this.addAll);
		},

		addOne: function(contact) {
			var userView = new app.UserItemView({model: contact});
			this.$('tbody').append(userView.render().$el);
		},

		addAll: function() {
			this.$('tbody').empty();
			if(this.emptyView) {
				this.emptyView.remove();
				this.emptyView = false;
			}
			this.colleciton.each(this.addOne, this);
		},

		render: function() {
			this.$el.html(this.template());
			return this;
		},

		isEmptyUsers: function() {
			if(this.colleciton.length && this.emptyView) {
				this.emptyView.remove();
				this.emptyView = false;
			} else if(!this.colleciton.length && !this.emptyView) {
				this.emptyView = new app.EmptyView();
				this.$('tbody').empty().append(this.emptyView.render().$el);
			}	
		}
	});
})();