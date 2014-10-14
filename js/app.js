var App = new Marionette.Application();

App.addRegions({
	'mainRegion': '#wrapper'
});

App.on("start", function(){
  if(Backbone.history){
    Backbone.history.start();
  }
});

