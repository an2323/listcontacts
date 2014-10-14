define(["app", 
	    "tpl!apps/users/list/templates/users.tpl", 
	    "tpl!apps/users/list/templates/user.tpl", 
	    "tpl!apps/users/list/templates/empty.tpl"], function(App, UsersTpl, UserTpl, EmptyTpl) {
	App.module("UsersApp.List.View", function(View, App, Backbone, Marionette, $, _){
		View.User = Marionette.ItemView.extend({
			tagName:  'tr',
			template: UserTpl,

			triggers: {
				'click .remove': 'user:remove',
				'click .edit':   'user:edit'
			}
		});

		View.Empty = Marionette.ItemView.extend({
			tagName: 'tr',

			className: 'error',

			template: EmptyTpl,
		});

		View.Users = Marionette.CompositeView.extend({
			tagName:   'div',
			className: 'row',
			template:  UsersTpl,

			childView: View.User,

			childViewContainer: 'tbody',

			emptyView: View.Empty,

			triggers: {
				'click .add': 'add:user'
			}
		});
	});
	return App.UsersApp.List.View;
});
