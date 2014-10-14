define(["app", 'apps/users/common/views'], function(App, CommonView) {
	App.module("UsersApp.New.View", function(View, App, Backbone, Marionette, $, _){
	  //Переопределяем только шапку
	  View.User = CommonView.UserForm.extend({
	    onRender: function() {
	      this.$(".title-h").text("Добавить пользователя");
	    }
	  });
	});
	return App.UsersApp.New.View;
});
