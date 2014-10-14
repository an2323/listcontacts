App.module("UsersApp.List", function(List, App, Backbone, Marionette, $, _){
	List.User = Marionette.ItemView.extend({
		tagName:  'tr',
		template: '#item-contact',

		triggers: {
			'click .remove': 'user:remove',
			'click .edit':   'user:edit'
		}
	});

	List.Empty = Marionette.ItemView.extend({
		tagName: 'tr',

		className: 'error',

		template: '#no-contact',
	});

	List.Users = Marionette.CompositeView.extend({
		tagName:   'div',
		className: 'row',
		template:  '#list-contact',

		childView: List.User,

		childViewContainer: 'tbody',

		emptyView: List.Empty,

		triggers: {
			'click .add': 'add:user'
		}
	});
});