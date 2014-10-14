var app = app || {};

(function() {
	app.EmptyView = Marionette.ItemView.extend({
		tagName: 'tr',
		className: 'error',
		template: '#no-contact',
	});
})();

