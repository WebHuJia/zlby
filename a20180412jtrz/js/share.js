/*
 *	share.js - Tencent Game sns javaScript plugin
 *	Version : 1.0.0
 *	Author : Smallni Ding
 *	Date : 2014-06-16
 */

(function(scope){

    function UriComponentEncode(sStr)
    {
        sStr = encodeURIComponent(sStr);
        sStr = sStr.replace(/~/g,"%7E");
        sStr = sStr.replace(/!/g,"%21");
        sStr = sStr.replace(/\*/g,"%2A");
        sStr = sStr.replace(/\(/g,"%28");
        sStr = sStr.replace(/\)/g,"%29");
        sStr = sStr.replace(/'/g,"%27");
        sStr = sStr.replace(/\?/g,"%3F");
        sStr = sStr.replace(/;/g,"%3B");
        return sStr;
    }

    //默认参数
    var defaults = {
        iconSize : 16,  //分享图标的大小,0为16px X 16px，1为24px X 24px
        snsModule : ['wechat','qq','qzone','buluo','pengyou','sina','douban','kaixin','renren'], //分享类型 wechat,qq,qzone,weibo,pengyou,sina,douban,kaixin,renren
        title : document.title,
        url : UriComponentEncode(document.location.href),
        picUrl : (document.getElementsByTagName('img')[0] && document.getElementsByTagName('img')[0].src) || '',
        snsID :'tg-sns',
        isWindow : true,     //分享打开类型，true为弹窗打开，false为新页面打开，默认为弹窗打开
        tcss : true      //是否添加点击流，true为添加，false为不添加，默认添加
    }



    //工具库，用于参数继承
    var util ={
        extend : function(oSource, eSoruce){
            var temp = {};
            for(var k in oSource){
                temp[k] = oSource[k];
            }
            for(var j in eSoruce){
                if((j == 'title') && eSoruce['title'].replace(/(^\s*)|(\s*$)/g, "").length ==0){
                    continue;
                }else if((j == 'url') && eSoruce['url'].replace(/(^\s*)|(\s*$)/g, "").length ==0){
                    continue;
                }else{
                    temp[j] = eSoruce[j];
                }
            }
            return temp;
        }
    }
    man1 = true;

    var TGshare = scope.TGshare = function(opt){
        //变量初始化
        var opts = util.extend(defaults, opt),
            size = opts.iconSize,
            type = opts.snsModule,
            open = opts.isWindow,
            url = encodeURIComponent(opts.url),
            title = encodeURIComponent(opts.title),
            tcss = opts.tcss,
            l = type.length,
            str = '',
            pic = opts.picUrl,
            id = opts.snsID;
        if(man1){
            var style = scope.document.getElementsByTagName('head')[0],
                c = scope.document.createElement('style');
            style.appendChild(c);
            c.type = 'text/css';
            //判断图标尺寸
            if(size == 16 && man1){
                var css = '.tg-sns{ height=16px; oveflow:hidden; *zoom:1;}.tg-sns-link{ float:left; width:16px; height:16px; margin-right: 5px; text-indent:-9999em; overflow:hidden; background-image:url(http://ossweb-img.qq.com/images/icon/share/icon-sns-16.png); background-position:-9999em -9999em; background-repeat:no-repeat;}.tg-sns-link:hover{opacity: 0.7;filter: alpha(opacity=70);}.tg-sns-wechat{ background-position: 0 0}.tg-sns-qq{ background-position: -20px 0}.tg-sns-qzone{ background-position: -40px 0}.tg-sns-weibo{ background-position: -60px 0}.tg-sns-pengyou{ background-position: -80px 0}.tg-sns-sina{ background-position: -100px 0}.tg-sns-douban{ background-position: -120px 0}.tg-sns-kaixin{ background-position: -140px 0}.tg-sns-renren{ background-position: -160px 0}'
                if (c.styleSheet) { //for ie
                    c.styleSheet.cssText = css;
                } else {//for w3c
                    c.appendChild(document.createTextNode(css));
                }
            }else if(size == 24 && man1){
                var css = '.tg-sns{ height=24px; overflow:hidden; *zoom:1;}.tg-sns-link{ float:left; width:24px; height:24px; margin-right: 5px; text-indent:-9999em; overflow:hidden; background-image:url(http://ossweb-img.qq.com/images/icon/share/icon-sns-24.png); background-position:-9999em -9999em; background-repeat:no-repeat;}.tg-sns-link:hover{opacity: 0.7;filter: alpha(opacity=70);}.tg-sns-wechat{ background-position: 0 0}.tg-sns-qq{ background-position: -30px 0}.tg-sns-qzone{ background-position: -60px 0}.tg-sns-weibo{ background-position: -90px 0}.tg-sns-pengyou{ background-position: -120px 0}.tg-sns-sina{ background-position: -150px 0}.tg-sns-douban{ background-position: -180px 0}.tg-sns-kaixin{ background-position: -210px 0}.tg-sns-renren{ background-position: -240px 0}'
                if (c.styleSheet) { //for ie
                    c.styleSheet.cssText = css;
                } else {//for w3c
                    c.appendChild(document.createTextNode(css));
                }
            }
            man1 = false;
        }


        //分享接口URL生成
        var urlinfo = {
            'wechat':['微信','game.qq.com/share/weixin.htm?url=' + url + '&title=' + title + '&pic=' + pic],
            'qq':['QQ好友','connect.qq.com/widget/shareqq/index.html?url=' + url + '&title=' + title + '&pics=' + pic],
            'qzone':['QQ空间','sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + url + '&title=' + title + '&pics=' + pic],
            'buluo':['QQ部落','buluo.qq.com/p/barindex.html?bid=395034'],
            'pengyou':['朋友网','sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?to=pengyou&url=' + url + '&title=' + title + '&pic=' + pic],
            'sina':['新浪微博','v.t.sina.com.cn/share/share.php?url=' + url + '&title=' + title + '&pic=' + pic],
            'douban':['豆瓣','www.douban.com/recommend/?url=' + url + '&title=' + title + '&pic=' + pic],
            'kaixin':['开心网','www.kaixin001.com/repaste/bshare.php?rurl=' + url + '&rtitle=' + title + '&pic=' + pic],
            'renren':['人人','share.renren.com/share/buttonshare.do?link=' + url + '&title=' + title + '&pic=' + pic]
        }


        //拼接html
        for(var j = 0; j < l; j++){
            if(open){
                if(tcss){
                    if(type[j] == 'wechat'){
                        str+='<a class="tg-sns-link tg-sns-' + type[j] + '" onclick="pgvSendClick({hottag:\'sns.buttons.' + type[j] + '\'})" href="http://' + urlinfo[type[j]][1] + '" title="分享到'+ urlinfo[type[j]][0] + '" target="_blank">'+  type[j] +'</a>';
                    }
                    else{
                        str+='<a class="tg-sns-link tg-sns-' + type[j] + '" onclick="pgvSendClick({hottag:\'sns.buttons.' + type[j] + '\'});window.open(\'http://' + urlinfo[type[j]][1] + '\',\'\',\'width=840, height=540\')" href="javascript:void(0)" title="分享到'+ urlinfo[type[j]][0] + '">'+ type[j]  +'</a>';
                    }
                }
                else{
                    if(type[j] == 'wechat'){
                        str+='<a class="tg-sns-link tg-sns-' + type[j] + '" href="http://' + urlinfo[type[j]][1] + '" title="分享到'+ urlinfo[type[j]][0] + '" target="_blank">'+  type[j] +'</a>';
                    }
                    else{
                        str+='<a class="tg-sns-link tg-sns-' + type[j] + '" onclick="window.open(\'http://' + urlinfo[type[j]][1] + '\',\'\',\'width=840, height=540\')" href="javascript:void(0)" title="分享到'+ urlinfo[type[j]][0] + '">'+ type[j]  +'</a>';
                    }
                }
            }else{
                if(tcss){
                    str+='<a class="tg-sns-link tg-sns-' + type[j] + '" onclick="pgvSendClick({hottag:\'sns.buttons.' + type[j] + '\'})" href="http://' + urlinfo[type[j]][1] + '" title="分享到'+ urlinfo[type[j]][0] + '" target="_blank">'+  type[j] +'</a>';
                }
                else{
                    str+='<a class="tg-sns-link tg-sns-' + type[j] + '" href="http://' + urlinfo[type[j]][1] + '" title="分享到'+ urlinfo[type[j]][0] + '" target="_blank">'+  type[j] +'</a>';
                }
            }
        }

        scope.document.getElementById(id).className = 'tg-sns';
        scope.document.getElementById(id).innerHTML = str;

    }
})(this);