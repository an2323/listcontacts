App.module("UsersApp.New.View", function(View, App, Backbone, Marionette, $, _){
  View.User = App.UsersApp.Common.View.UserForm.extend({
    onRender: function() {
      this.$(".title-h").text("Добавить пользователя");
    }
  });
});