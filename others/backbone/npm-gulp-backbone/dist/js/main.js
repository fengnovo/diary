(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['jquery', 'underscore', 'backbone'], factory);
	} else if (typeof exports !== "undefined") {
		factory(require('jquery'), require('underscore'), require('backbone'));
	} else {
		var mod = {
			exports: {}
		};
		factory(global.jquery, global.underscore, global.backbone);
		global.main = mod.exports;
	}
})(this, function (_jquery, _underscore, _backbone) {
	'use strict';

	var _jquery2 = _interopRequireDefault(_jquery);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _backbone2 = _interopRequireDefault(_backbone);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var ToDoItem = _backbone2.default.Model.extend({});
	var toDoItem = new ToDoItem({
		'title': 'task1',
		'description': 'description1'
	});
	var ToDoItemView = _backbone2.default.View.extend({
		tagName: 'p',
		id: 'header',
		render: function render() {
			console.log(this.$el[0]);
			(0, _jquery2.default)(this.el).html('<span>header</sapn>');
			return this;
		}
	});
	var toDoItemView = new ToDoItemView();
	var eeel = toDoItemView.render().el;
	console.log(eeel);
	(0, _jquery2.default)(eeel).appendTo((0, _jquery2.default)('body'));
});