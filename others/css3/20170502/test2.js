/*插入排序*/
function insertSort(array){
    /*start根据已排列好的项数决定*/
    var start=1;
    /*按顺序，每一项检查已排列好的序列*/
    for(var i=start; i<array.length; start++,i++){
      /*跟已排好序的序列做对比，并插入到合适的位置*/
      for(var j=0; j<start; j++){
        /*小于或者等于时（我们是升序）插入到该项前面*/
        if(array[i]<=array[j]){
          console.log(array[i]+' '+array[j]);
          array.splice(j,0,array[i]);
          /*删除原有项*/
          array.splice(i+1,1);
          break;
        }
      }

    }
    return array;
}

var r = insertSort([50,11,16,32,24,99,57,100]);
console.log(r);