App.module("Entities", function(Entities, App, Backbone, Marionette, $, _){
	var userStorage = new Backbone.LocalStorage('users');
	
	Entities.User = Backbone.Model.extend({
		urlRoot: '/users',
		localStorage: userStorage,

		defaults: {
			name: '',
			age: 0,
			email: ''
		},
		validate: function(data) {
			var errors = {};

			if(data.name === '') {
				errors.name = "Данное поле должно быть заполнено";
			}

			if(data.age < 1 || data.age > 100) {
				errors.age = "Возраст должен быть в диапазоне от 1 до 100";
			}

			if(data.email.search(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/) === -1) {
				errors.email = "Некорректно заполен email";
			}

			return _.isEmpty(errors) ? null : errors;
		}
	});

	Entities.Users = Backbone.Collection.extend({
		model: Entities.User,
		url: '/users',
		localStorage: userStorage
	});

	var API = {
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

	App.reqres.setHandler("user:entities", function(){
	    return API.getUserEntities();
	});

	App.reqres.setHandler("user:entity", function(id){
		return API.getUserEntity(id);
	});
});