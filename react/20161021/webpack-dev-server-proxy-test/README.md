# webpack-dev-server 和 fetch练习  
```
devServer: {
		historyApiFallback: true,
      	hot: true,
		inline: true,
		stats: { colors: true },
		proxy: {
	        '/list': {
	          target: 'http://10.2.130.20:9000',
	          pathRewrite: {'^/column' : '/column'},
	          changeOrigin: true
	        }
	     }
	},
```  
```  
$.ajax({
     type: "GET",
     url: "/list/column",
     data: {username:$("#username").val(), content:$("#content").val()},
     dataType: "json",
     success: function(data){
                 console.log(data);
              }
 });  
```

```  
fetch('/list/column')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
        this.setState({
            data: JSON.stringify(data)
        });
        // console.log(this.state.data);
    })
    .catch((ex) => {
        console.log(ex);
    });  
```  





# development  
```  
"start": "webpack-dev-server --port 3000 --hot --host 0.0.0.0"  
"build": "webpack"
  
```
参考博客
``` 
https://github.com/github/fetch  
https://segmentfault.com/q/1010000004135766  

...

```