$scope.$watch('boardName', function (newVal, oldVal, context) {
    if ('PLAY' === newVal) {
        $scope.staObj.showDownGuider = !window.userData.mobileMode;
                if (!context.isReback) {    // 从页面按钮操作进入播放页(1、主页点击音频；2、金牌主讲Tab点击音频)，需要重新播放音频，并设置返回按钮的操作
                    initPlayBoard();
                    AudioLecture.stat(curEpisodeId, 1).then(function (data) {
                    });

                    context.audioPlayed = true;

                    window.back = function () { // 音频加载中的时候退回时首页时，必须loadRes('')，否则首页会继续播放，因为audio不会从内存中马上清除
                    audio && audio.loadRes('');
                    audio = null;
                    console.log('-----------------window.defultBackFun');
                    window.defultBackFun();
                    window.back = window.defultBackFun;
                    return true
                }
                    /*if (!oldVal || 'PLAY' == oldVal) { // 1、
                        // 使用默认的window.back,参照script.js
                        window.back = window.defultBackFun;
                    }
                    else if ('COMMENT' === oldVal) {    // 2、
                        window.back =  function () {
                            $scope.navTitle = 'provider';
                            $scope.boardName = 'COMMENT';
                            $scope.isReback = true;
                            $scope.$apply();

                            return true;
                        };
                    }*/
                }
                else {  // 点击返回按钮进入的（只有一种情况，就是从评论页），正在播放的音频就OK，但需要用默认的window.back重新设置按钮的操作
                    if(!$scope.staObj.noRight && !audio){
                        initPlayBoard();
                    }
                    window.back = function () {
                        audio && audio.loadRes('');
                        audio = null;
                        console.log('-----------------window.defultBackFun1');
                        window.defultBackFun();
                        window.back = window.defultBackFun;
                        return true
                    }
                }
            }
        });