define(["app", "apps/users/list/list_view"], function(App, View) {
  App.module("UsersApp.List", function(List, App, Backbone, Marionette, $, _){
    var Controller = Marionette.Controller.extend({
      listUsers: function() {
        require(["entities/user"], function() {
          //Получаем список пользователей. См. Entities.User
          var fetchingUsers = App.request("user:entities");

          var self = List.Controller;

          $.when(fetchingUsers).done(function(users) {
            var view  = new View.Users({collection: users});
              App.mainRegion.show(view);
              
              self.listenTo(view, 'add:user', function() {
                App.trigger('user:new');            
              });

              //Здесь интересно!!!
              //Подписываемся на дочернее событие view, т.е. в нашем примере на событие каждой строки 
              self.listenTo(view, 'childview:user:remove', function(childView, data) {
                data.model.destroy();
                childView.remove();
              });

              self.listenTo(view, 'childview:user:edit', function(childView, data) {
                App.trigger('user:edit', data.model.get('id'));
              });
          }); 
        });            
      }
    });
    List.Controller = new Controller();
  });
  return App.UsersApp.List.Controller;
});
