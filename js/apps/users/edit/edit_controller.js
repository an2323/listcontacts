App.module("UsersApp.Edit", function(Edit, App, Backbone, Marionette, $, _){
  var Controller = Marionette.Controller.extend({
  	editUser: function(id) {

      var fetchingUser = App.request("user:entity", id);

      var self = Edit.Controller;

      $.when(fetchingUser).done(function(user) {
        var view = new Edit.View.User({model: user});
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
  	}
  });
  Edit.Controller = new Controller();
});