//http://web.juhe.cn:8080/finance/exchange/rmbquot

// $.get('http://localhost:8000/api',function(data){
// 	$('#app').html(data);
// })

// $.get('http://localhost:8000/api',function(data){
// 	$('#app').html(data);
// })

//http://localhost:8000/api/navs?page=1&pageSize=50

// $.ajax({
//     url: 'http://localhost:3000/api/navs?page=1&pageSize=50', 
//     type: 'GET',
//     dataType: 'jsonp',
//     crossDomain: true,
//     contentType: 'application/json', 
//     jsonp:"callback",
//     jsonpCallback:"flightHandler",
//     flightHandler :function(json){
// 	   console.log(json);
// 	},
//     success: function(json){
// 	   console.log(json);
// 	},
// 	error: function(){
// 		$('#app').append('未知错误，请联系维护人员');
// 	}
// });


$.ajax({
    url: 'http://localhost:3000/api/login', 
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json', 
    data: JSON.stringify({oaname:'huangyunfeng', password:'123456'})
})
.done(function(json){
    debugger
    $('#app').append(json);
})
.fail(function(){
    $('#app').append('未知错误，请联系维护人员');
}); 