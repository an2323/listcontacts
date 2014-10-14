App.module("UsersApp.New", function(New, App, Backbone, Marionette, $, _){
  var Controller = Marionette.Controller.extend({
  	addUser: function() {
  		var user = new App.Entities.User();
  		var view = new New.View.User({model: user});

       App.mainRegion.show(view);

        New.Controller.listenTo(view, 'form:submit', function(data) {
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
      
  	}
  });
  New.Controller = new Controller();
});