//http://web.juhe.cn:8080/finance/exchange/rmbquot

$.get('http://localhost:8000/api',function(data){
	$('#app').html(data);
})