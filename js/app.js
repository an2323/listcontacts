var app = {};

app.userStorage = new Backbone.LocalStorage('users');
app.User = Backbone.Model.extend({
	urlRoot: '/users',
	localStorage: app.userStorage,

	defaults: {
		name: '',
		age: 0,
		email: ''
	}
});

app.UserCollection = Backbone.Collection.extend({
	model: app.User,
	url: '/users',
	localStorage: app.userStorage
});

//Backbone view example
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

app.EmptyView = Backbone.View.extend({
	tagName: 'tr',

	className: 'error',

	template: _.template($('#no-contact').html()),

	render: function() {
		this.$el.html(this.template());
		return this;
	}
});

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

new app.Router();
Backbone.history.start();