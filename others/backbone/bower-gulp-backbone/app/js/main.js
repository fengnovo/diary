var ToDoItem = Backbone.Model.extend({
	initialize: function(){
      	document.writeln("Welcome to 1..");
   	}
});
var toDoItem = new ToDoItem({
	'title': 'task1',
	'description': 'description1'
});
var toDoItem2 = new ToDoItem({
	'title': 'task1',
	'description': 'description2'
});

toDoItem2.set({
	name: 'fengnovo'
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

if(toDoItem.has('name')){
	document.writeln('fengnovo');
}


if(toDoItem2.has('name')){
	document.writeln('fengnovo');
}
document.writeln(toDoItem2.get('name'));

toDoItem2.unset('name');

document.writeln(toDoItem2.get('name'));

document.writeln(JSON.stringify(toDoItem2));


// 定义模型类  
var Book = Backbone.Model.extend({  
    defaults : {  
        name : '',  
        price : 0  
    }  
});  
  
// 定义初始化数据  
var data = [{  
    id : 1001,  
    name : '构建高性能Web站点',  
    price : 56.30  
}, {  
    id : 1002,  
    name : '深入分析Java Web技术内幕',  
    price : 51.80  
}, {  
    id : 1003,  
    name : '编写高质量代码:Web前端开发修炼之道',  
    price : 36.80  
}, {  
    id : 1004,  
    name : '基于MVC的JavaScript Web富应用开发',  
    price : 42.50  
}, {  
    id : 1005,  
    name : 'RESTful Web Services Cookbook中文版',  
    price : 44.30  
}]  
  
// 创建集合对象  
var books = new Backbone.Collection(data, {  
    model : Book  
});  
  
// 根据id和cid查找模型对象  
var book1 = books.get(1001);  
var book2 = books.get(1002);  
  
// 在控制台输出模型  
// console.dir(book1);  
// console.dir(book2);  


// 定义模型类  
var Goods = Backbone.Model.extend({  
    defaults : {  
        author_id : '',  
        title : ''  
    }  
});  
  
// 定义集合类  
var GoodsList = Backbone.Collection.extend({  
    model : Goods,  
    url : '//cnodejs.org/api/v1/topics'  
});  
  
// 创建集合对象, 并从服务器同步初始化数据  
var goods = new GoodsList();  
goods.fetch({  
    success: function(collection, resp) {  
        // 同步成功后在控制台输出集合中的模型列表  
        console.dir(collection.models); 
        console.dir(resp);   
    }  
});  




 var ViewDemo = Backbone.View.extend({
    events: {
       'change input': 'sayHi'
    },

    initialize: function() {
        this.setElement($('#myview'));   //'setElement' changes the element associated with the view
    },

    sayHi: function() {
       document.write('Welcome to Yiibai.com!!!');
    }
 });

 var viewdemo = new ViewDemo;
