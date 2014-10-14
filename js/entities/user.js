define(["app", "localstorage"], function(App) {
	App.module("Entities", function(Entities, App, Backbone, Marionette, $, _){
		//Используется для имитации сервера.
		var userStorage = new Backbone.LocalStorage('users');

		Entities.User = Backbone.Model.extend({
			urlRoot: '/users',
			localStorage: userStorage,

			defaults: {
				name: '',
				age: 0,
				email: ''
			},

			//Валидация с помощью плагина Backbone.Validation.
			//https://github.com/thedersen/backbone.validation
			validation: {
				name: {
					required: true,
					msg: "Данное поле должно быть заполнено"
				},
				age: {
					range: [1, 100],
					msg: "Возраст должен быть в диапазоне от 1 до 100"
				},
				email: {
					pattern: 'email',
					msg: "Некорректно заполен email"
				}
			}
		});

		Entities.Users = Backbone.Collection.extend({
			model: Entities.User,
			url: '/users',
			localStorage: userStorage
		});

		//API для получения пользователей
		var API = {
			//Получение всех юзеров
		    getUserEntities: function(){
		      var users = new Entities.Users();
		      var defer = $.Deferred();
		      users.fetch({
		        success: function(data){
		          defer.resolve(data);
		        }
		      });
		      var promise = defer.promise();
		      return promise;
		    },

		    //Получение одного юзера
		    getUserEntity: function(userId){
		      var user = new Entities.User({id: userId});
		      var defer = $.Deferred();
		      user.fetch({
			  	  success: function(data){
			        defer.resolve(data);
			      },
			      error: function(data){
			        defer.resolve(undefined);
			      }
	          });
		      return defer.promise();
		    }
	    };

	    //Здесь используется механизм Request/Response. В Marionette реализован с помощью Backbone.Wreqr.
	    //https://github.com/marionettejs/backbone.wreqr - ссылка на сам плагин (по умолчанию спользуется в Marionette)
	    //http://www.youtube.com/watch?v=2b1G3TdlQEU - хорошее объяснение работы Backbone.Wreqr
	    
	    //Устанавливаем обработчики на запрос по получению всех пользователей
		App.reqres.setHandler("user:entities", function(){
		    return API.getUserEntities();
		});

	    //Устанавливаем обработчики на запрос по получению одного пользователя
		App.reqres.setHandler("user:entity", function(id){
			return API.getUserEntity(id);
		});
	});
});
