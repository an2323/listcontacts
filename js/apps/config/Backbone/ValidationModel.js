define(["backbone", "validation"], function() {
	//Все модели будут использовать Backbone.Validation 
	_.extend(Backbone.Model.prototype, Backbone.Validation.mixin);
});
