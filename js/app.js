define(["marionette", "bootstrap", "apps/config/Backbone/ValidationModel"], function(Marionette) {
	//Создание объекта приложения
	var App = new Marionette.Application();
	
	//Инициализируем регион 
	//https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.region.md
	App.addRegions({
		'mainRegion': '#wrapper'
	});

	//Подписываемся на событие старта приложения
	App.on("start", function(){
	  require(["apps/users/user_app"], function() {
		  if(Backbone.history){
		    Backbone.history.start();
		  }
	  });	 
	});

	return App;
});
