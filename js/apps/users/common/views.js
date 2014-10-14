define(["app", "tpl!apps/users/common/templates/user.tpl", "syphon"], function(App, EditTpl) {
  App.module("UsersApp.Common.View", function(View, App, Backbone, Marionette, $, _){
    //Базовое представление для создания и редактирования
    View.UserForm = Marionette.ItemView.extend({
      tagName: 'div',

      events: {
        'submit form': 'submitClicked'
      },

      template: EditTpl,

      submitClicked: function(ev) {
        ev.preventDefault();
        //Тут используется плагин Backbone.Syphon для получения данных формы
        //https://github.com/marionettejs/backbone.syphon
        var data = Backbone.Syphon.serialize(this);

        this.trigger('form:submit', data);
      },

      //Обработчик на событие "data:invalid" (ошибка валидации), возникающее
      //при создании/редактировании юзера
      onDataInvalid: function(errors) {
        this.$el.find('form .error').removeClass('error');
        this.$el.find('form .help-inline').text('');

        for(var i in errors) {
          var input = this.$('input[name="' + i + '"]');
          input.parents('.control-group').addClass('error');
          input.next().text(errors[i]);
        }
      }
    });
  });
  return App.UsersApp.Common.View;
});

