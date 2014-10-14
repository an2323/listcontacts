requirejs.config({
  baseUrl: "js",
  paths: {
    backbone: "vendor/backbone",
    "backbone.syphon": "vendor/backbone.syphon",
    jquery: "vendor/jquery",
    localstorage: "vendor/backbone.localstorage",
    marionette: "vendor/backbone.marionette",
    text: "vendor/text",
    tpl: "vendor/underscore-tpl",
    underscore: "vendor/underscore",
    bootstrap: "vendor/bootstrap.min",
    validation: "vendor/backbone-validation",
    syphon: "vendor/backbone.syphon"
  },

  shim: {
    underscore: {
      exports: "_"
    },
    backbone: {
      deps: ["jquery", "underscore"],
      exports: "Backbone"
    },
    "backbone.syphon": ["backbone"],
    marionette: {
      deps: ["backbone"],
      exports: "Marionette"
    },
    bootstrap: ["jquery"],
    localstorage: ["backbone"],
    tpl: ["text"],
    validation: ["backbone"],
    syphon: ["backbone"]
  }
});

//Точка входа в приложение
require(["app"], function(App){
  App.start();
});