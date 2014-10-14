App.module("UsersApp", function(UsersApp, App, Backbone, Marionette, $, _){
  UsersApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      "":               "listUsers",
      "users":          "listUsers",
      "users/:id/edit": "editUser",
      "users/new":      "newUser",
    }
  });

  var API = {
    listUsers: function(){
      UsersApp.List.Controller.listUsers();
    },

    editUser: function(id){
      UsersApp.Edit.Controller.editUser(id);
    },
    newUser: function() {
      UsersApp.New.Controller.addUser();
    }
  };

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