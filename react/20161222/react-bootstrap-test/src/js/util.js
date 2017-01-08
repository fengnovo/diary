let oaUser;

let getOaUser = () => {
    if (oaUser) {
        return oaUser;
    }

    let key ='APPADMIN_SESSION=', 
        cookie = document.cookie, 
        startIdx = cookie.indexOf(key),
        endIdx = cookie.indexOf(';', startIdx);
    let reg = /%00(.*?)%00/g, fields;

    if(-1 == startIdx) {
        return undefined;
    }

    (-1 == endIdx) && (endIdx = cookie.length);
    fields = cookie.substring(startIdx + key.length, endIdx).match(reg);

    fields.length && (oaUser = {});

    for (let i = 0, len = fields.length; i < len; i++) {
        let field = decodeURIComponent(fields[i].replace(/%00/g, '')),
            kv = field.split(':');

        oaUser[kv[0]] = kv[1];
    }

    return oaUser;
}

let keyToName = function (keyArr, key) {
    let it = keyArr.find((item) => (item.key == key));

    return (it && it.name) || '无效键值';
};

let dateStrFromUnix = function (unixTime, sep='-') {
    let d = new Date(unixTime*1000),
        y = d.getFullYear(),
        m = d.getMonth() + 1,
        day = d.getDate();

    m = (m > 9 ? m : '0'+m);
    day = (day > 9 ? day : '0'+day);

    return `${y}${sep}${m}${sep}${day}`;
}

let timeStrFromUnix = function (unixTime, sep=':') {
    let d = new Date(unixTime*1000),
        h = d.getHours(),
        m = d.getMinutes(),
        s = d.getSeconds();

    h = (h > 9 ? h : '0'+h);
    m = (m > 9 ? m : '0'+m);
    s = (s > 9 ? s : '0'+s);

    return `${dateStrFromUnix(unixTime)}  ${h}${sep}${m}${sep}${s}`;
}

let changeToCategoryName = cg => {
    let cgName = '';
    switch (cg) {
        case 1 :
            cgName = '轮播广告';
            break;
        case 2 :
            cgName = '文字条广告';
            break;
        case 3 :
            cgName = '四方格广告';
            break;
    }
    return cgName;
}

let changeStatusToShow = linkUrl => {
    let stName = '', st = 0, showUrl = '';
    console.log(linkUrl);
    switch (true) {
        case linkUrl.startsWith('web:'):
            stName = '指向h5页面';
            st = 1;
            showUrl = linkUrl.slice(4);
            break;
        case linkUrl.startsWith('native:'):
            stName = '指向原生界面';
            st = 2;
            showUrl = linkUrl.slice(7);
            break;
        case linkUrl.startsWith('arms:'):
            stName = '指向arms界面';
            st = 3;
            showUrl = linkUrl.slice(5);
            break;
    }
    return {stName,st,showUrl};
}

let changeStatusToAction = (st,linkUrl) => {
    let actionLinkUrl = '';
    console.log(linkUrl);
    st = parseInt(st);
    switch (st) {
        case 1 :
            actionLinkUrl = 'web:'+linkUrl;
            break;
        case 2 :
            actionLinkUrl = 'native:'+linkUrl;
            break;
        case 3 :
            actionLinkUrl = 'arms:'+linkUrl;
            break;
    }
    return { actionLinkUrl };
}

export default {getOaUser, keyToName, dateStrFromUnix, timeStrFromUnix, changeToCategoryName, changeStatusToShow, changeStatusToAction };