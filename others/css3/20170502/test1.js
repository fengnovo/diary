/*快速排序*/
function fastSort(array,head,tail){
    //考虑到给每个分区操作的时候都是在原有的数组中进行操作的，所以这里head,tail来确定分片的位置
    /*生成随机项*/
    var randomnum = Math.floor(ranDom(head,tail));
    var random = array[randomnum];
    /*将小于random的项放置在其左边  策略就是通过一个临时的数组来储存分好区的结果，再到原数组中替换*/
    var arrayTemp = [];
    var unshiftHead = 0;
    for(var i = head;i <= tail;i++){
      if(array[i]<random){
        arrayTemp.unshift(array[i]);
        unshiftHead++;
      }else if(array[i]>random){
        arrayTemp.push(array[i]);
      }
      /*当它等于的时候放哪，这里我想选择放到队列的前面，也就是从unshift后的第一个位置放置*/
      if(array[i]===random){
        arrayTemp.splice(unshiftHead,0,array[i]);
      }
    }
    /*将对应项覆盖原来的记录*/
    for(var j = head , u=0;j <= tail;j++,u++){
      array.splice(j,1,arrayTemp[u]);
    }
    /*寻找中间项所在的index*/
    var nowIndex = array.indexOf(random);

    /*设置出口，当要放进去的片段只有2项的时候就可以收工了*/
    if(arrayTemp.length <= 2){
      return;
    }
    /*递归，同时应用其左右两个区域*/
    fastSort(array,head,nowIndex);
    fastSort(array,nowIndex+1,tail);
    return array;
}

var r = fastSort([50,11,16,32,24,99,57,100]);
console.log(r);