define(["app"], function(App) {
	App.module("UsersApp", function(UsersApp, App, Backbone, Marionette, $, _){
	  //Здесь создается роутер для нашего подприложения "users".
	  UsersApp.Router = Marionette.AppRouter.extend({
	    appRoutes: {
	      "":               "listUsers",
	      "users":          "listUsers",
	       "users/:id/edit": "editUser",
	       "users/new":      "newUser",
	    }
	  });

	  //API, которое использует роутер, а также обработчики событий
	  var API = {
	    listUsers: function(){
	      require(["apps/users/list/list_controller"], function(controller) {
	     	 controller.listUsers();
	      });	
	    },

	    editUser: function(id){
	       require(["apps/users/edit/edit_controller"], function(controller) {
	     	 controller.editUser(id);
	      });
	    },
	    newUser: function() {
	      require(["apps/users/new/new_controller"], function(controller) {
	     	 controller.addUser();
	      });
	    }
	  };

	  //События вызывающиеся при смене состояния приложения
	  this.listenTo(App, 'users:list', function() {
	  	Backbone.history.navigate('/users');
	  	API.listUsers();
	  });

	  this.listenTo(App, 'user:edit', function(id) {
	  	Backbone.history.navigate('/users/' + id + '/edit');
	  	API.editUser(id);
	  });

	  this.listenTo(App, 'user:new', function() {
	    Backbone.history.navigate('/users/new');
	    API.newUser();
	  });

	  App.addInitializer(function(){
	    new UsersApp.Router({
	      controller: API
	    });
	  });
	});
	return App.UsersApp.Router;
});
