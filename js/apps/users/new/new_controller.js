define(["app", "apps/users/new/new_view"], function(App, View) {
  App.module("UsersApp.New", function(New, App, Backbone, Marionette, $, _){
    var Controller = Marionette.Controller.extend({
      addUser: function() {
        require(["entities/user"], function() {
            var user = new App.Entities.User();
            var view = new View.User({model: user});

              App.mainRegion.show(view);

              //Слушаем событие отправки формы
              New.Controller.listenTo(view, 'form:submit', function(data) {
                 var saving = user.save(data);

                 if(saving) {
                   $.when(saving).done(function() {
                   	 //Если пользователь сохранен, показываем список пользователей
                     App.trigger('users:list');
                   }).fail(function(response) {
                     //Ошибка
                  });
                 } else {
                   //Вызываем события "data:invalid" с объектом-коллекцией ошибок
                   view.triggerMethod('data:invalid', user.validationError);
                 }
              });
        });        
      }
    });
    New.Controller = new Controller();
  });
  return App.UsersApp.New.Controller;
});
