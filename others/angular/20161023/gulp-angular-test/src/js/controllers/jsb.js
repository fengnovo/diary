var JSBridgeCallBack = {

};

var JSBridge = {
    setWebviewTitle: function (title) {
        if(window.JSB_CONFING.mode == 'android'){
            JavaScriptBridge.setTitle(title);
        }else if(window.JSB_CONFING.mode == 'ios'){
            if(window.setTitle)
                window.setTitle(title);
        }else {
            window.gWebViewTitle = title;
        }
    }
};

