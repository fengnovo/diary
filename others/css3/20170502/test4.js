/*选择排序  */
function selectSort(array){
    /*给每个插入后的未确定的范围循环，初始是从0开始*/
    for(var unfixed=0; unfixed<array.length; unfixed++){
      /*设置当前范围的最小值和其索引*/
      var min = array[unfixed];
      var minIndex = unfixed;
      /*在该范围内选出最小值*/
      for(var j=unfixed+1; j<array.length; j++){
        if(min>array[j]){
          min = array[j];
          minIndex = j;
        }
      }
      /*将最小值插入到unfixed，并且把它所在的原有项替换成*/
      array.splice(unfixed,0,min);
      array.splice(minIndex+1,1);
    }
    return array;
}

var r = selectSort([50,11,16,32,24,99,57,100]);
console.log(r);