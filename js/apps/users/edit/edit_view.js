App.module("UsersApp.Edit.View", function(View, App, Backbone, Marionette, $, _){
  View.User = App.UsersApp.Common.View.UserForm.extend({
    onRender: function() {
      this.$(".title-h").text("Редактировать пользователя");
    }
  });
});