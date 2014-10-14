App.module("UsersApp.List", function(List, App, Backbone, Marionette, $, _){
  var Controller = Marionette.Controller.extend({
  	listUsers: function() {
  		var fetchingUsers = App.request("user:entities");

  		var self = List.Controller;

  		$.when(fetchingUsers).done(function(users) {
  			var view  = new List.Users({collection: users});
       		App.mainRegion.show(view);
      		
      		self.listenTo(view, 'add:user', function() {
				App.trigger('user:new');      			
	      	});

	      	self.listenTo(view, 'childview:user:remove', function(childView, data) {
	      		data.model.destroy();
	      		childView.remove();
	      	});

	      	self.listenTo(view, 'childview:user:edit', function(childView, data) {
	      		App.trigger('user:edit', data.model.get('id'));
	      	});
  		});  		
  	}
  });
  List.Controller = new Controller();
});