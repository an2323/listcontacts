define(["app", "apps/users/edit/edit_view"], function(App, View) {
  App.module("UsersApp.Edit", function(Edit, App, Backbone, Marionette, $, _){
    var Controller = Marionette.Controller.extend({
    	editUser: function(id) {
        require(["entities/user"], function() {
            var fetchingUser = App.request("user:entity", id);
            var self = Edit.Controller;

           	//Здесь аналогично view_controller
           	//Только сначала получаем пользователя
            $.when(fetchingUser).done(function(user) {
              var view = new View.User({model: user});
              App.mainRegion.show(view);

              self.listenTo(view, 'form:submit', function(data) {
                var saving = user.save(data);
                if(saving) {
                  $.when(saving).done(function() {
                    App.trigger('users:list');
                  }).fail(function(response) {
                    //Ошибка
                  });
                } else {
                  view.triggerMethod('data:invalid', user.validationError);
                }
              });
            });
        });      
    	}
    });
    Edit.Controller = new Controller();
  });
  return App.UsersApp.Edit.Controller;
});