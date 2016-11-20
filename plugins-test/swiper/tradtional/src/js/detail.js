
function get_length(s){
        var char_length = 0;
        for (var i = 0; i < s.length; i++){
            var son_char = s.charAt(i);
            encodeURI(son_char).length > 2 ? char_length += 1 : char_length += 0.5;
        }
        return char_length;
    }
    function cut_str(str, len){
        var char_length = 0;
        for (var i = 0; i < str.length; i++){
            var son_str = str.charAt(i);
            encodeURI(son_str).length > 2 ? char_length += 1 : char_length += 0.5;
            if (char_length >= len){
                var sub_len = char_length == len ? i+1 : i;
                return str.substr(0, sub_len);
                break;
            }
        }
    }

    var formatterDateTime = function() {
            var date=new Date()
            var month=date.getMonth() + 1
                var datetime = date.getFullYear()
                        + ""// "年"
                        + (month >= 10 ? month : "0"+ month)
                        + ""// "月"
                        + (date.getDate() < 10 ? "0" + date.getDate() : date
                                .getDate())
                        + ""
                        + (date.getHours() < 10 ? "0" + date.getHours() : date
                                .getHours())
                        + ""
                        + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
                                .getMinutes())
                        + ""
                        + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
                                .getSeconds());
            return datetime;
        }
var id = location.search.split('=')[1];
$.ajax({
    type: 'get',
    url:'https://route.showapi.com/883-1?showapi_appid=27453&showapi_timestamp='+formatterDateTime()+'&url='
    +id+'&showapi_sign=c2dfc63cf8054db8b87bcf204a4987dd',
    error: function(XmlHttpRequest, textStatus, errorThrown) {
        alert("操作失败!");
    },
    success: function(result) {
        var temp;
        console.log(result);
        if(result && result.showapi_res_body){
            var content = result.showapi_res_body;
            $('#title').html(content.title);
            $('#time').html(content.time);
            $('#app').html(content.html);
        }
        
    }
});