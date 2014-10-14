define(["app", 'apps/users/common/views'], function(App, CommonView) {
	App.module("UsersApp.Edit.View", function(View, App, Backbone, Marionette, $, _){
	  //Переопределяем только шапку
	  View.User = CommonView.UserForm.extend({
	    onRender: function() {
	      this.$(".title-h").text("Редактировать пользователя");
	    }
	  });
	});
	return App.UsersApp.Edit.View;
});
