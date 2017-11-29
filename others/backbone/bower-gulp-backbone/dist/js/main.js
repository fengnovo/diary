var ToDoItem = Backbone.Model.extend({

});
var toDoItem = new ToDoItem({
	'title': 'task1',
	'description': 'description1'
});
var ToDoItemView = Backbone.View.extend({
	tagName: 'p',
	id: 'header',
	render: function(){
		console.log(this.$el[0]);
		$(this.el).html('<span>header</sapn>');
		return this;
	}
});
var toDoItemView = new ToDoItemView();
var eeel = toDoItemView.render().el;
console.log(eeel);
$(eeel).appendTo($('body'));