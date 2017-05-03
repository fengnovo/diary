/*冒泡排序*/
function bubbleSort(array){
    /*给每个未确定的位置做循环*/
    for(var unfix=array.length-1; unfix>0; unfix--){
      /*给进度做个记录，比到未确定位置*/
      for(var i=0; i<unfix;i++){
        if(array[i]>array[i+1]){
          var temp = array[i];
          array.splice(i,1,array[i+1]);
          array.splice(i+1,1,temp);
        }
      }
    }
    return array;
}

var r = bubbleSort([50,11,16,32,24,99,57,100]);
console.log(r);