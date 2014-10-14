App.module("UsersApp.Common.View", function(View, App, Backbone, Marionette, $, _){
  View.UserForm = Marionette.ItemView.extend({
    tagName: 'div',

    events: {
      'submit form': 'submitClicked'
    },

    template: '#edit-contact',

    submitClicked: function(ev) {
      ev.preventDefault();
      var data = {};

      this.$("input[type!='submit']").each(function() {
          data[$(this).attr("name")] = $(this).val();
      });

      this.trigger('form:submit', data);
    },

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
