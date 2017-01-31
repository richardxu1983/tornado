/**
 * Created by 95 on 2016/3/7.
 */

var Notif = {

    init : function(options)
    {
        if( Debug ==false)
        {
            return;
        }
        $('<div>').addClass('devInfo').appendTo("body");
        $('<div>').addClass('devBack').appendTo("div.devInfo");
    },

    options : {},

    print : function(text){
        if( Debug ==false)
        {
            return;
        }
        if(typeof text == 'undefined') return;
        //if(text.slice(-1) != ".") text += ".";
        Notif.tp(text);
    },

    clearHidden : function(){
        var bottom = $('div.devBack').position().top + $('div.devBack').outerHeight(true);
        $('.devInfoTxt').each(function () {
            if($(this).position().top > bottom){
                $(this).remove();
            }
        })
    },

    tp : function(t)
    {
        var text = $('<div>').addClass('devInfoTxt').text(t).prependTo('div.devBack');
        Notif.clearHidden();
        /*text.animate({opacity:1} , 500 , 'linear' , function(){
            Notif.clearHidden();
        });*/
    },
};

function checkIshanzi(s) {
    //var patrn = /^[\u2E80-\u9FFF]$/; //Unicode编码中的汉字范围  /[^\x00-\x80]/
    var patrn = /[^\x00-\x80]/;
    if (!patrn.exec(s)) return false
    return true
}
 
//校验登录名：只能输入4-20个以字母开头、可带数字、“_”、“.”的字串
function checkIsRegisterUserName(s) {
    var patrn = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){3,19}$/;
    if (!patrn.exec(s)) return false
    return true
}
 
//校验用户姓名：只能输入4-30个以字母开头的字串
function checkIsTrueName(s) {
    var patrn = /^[a-zA-Z]{4,30}$/;
    if (!patrn.exec(s)) return false
    return true
}
 
//校验密码：只能输入6-20个字母、数字、下划线
function checkIsPasswd(s) {
    var patrn = /^[a-z0-9_-]{6,19}$/;
    if (!patrn.exec(s)) return false
    return true
}
 
//校验普通电话、传真号码：可以“+”开头，除数字外，可含有“-”
function checkIsTel(s) {
    var patrn = /^[+]{0,1}(d){1,4}[ ]?([-]?((d)|[ ]){1,12})+$/;
    if (!patrn.exec(s)) return false
    return true
}
 
//校验手机号码
function checkIsMobil(s) {
    var patrn = /^0?(13[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/;
    if (!patrn.exec(s)) return false
    return true
}
 
//校验邮政编码
function checkIsPostalCode(s) {
    var patrn = /^[a-zA-Z0-9 ]{3,12}$/;
    if (!patrn.exec(s)) return false
    return true
}
 
//校验是否IP地址
function checkIsIP(s) {
    var patrn = /^[0-9.]{1,20}$/;
    if (!patrn.exec(s)) return false
    return true
}
 
//校验EMail
function checkIsEMail(s) {
    //var regex = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    //var reg =   /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    var patrn = /^([0-9A-Za-z\-_\.]+)@([0-9A-Za-z]+\.[A-Za-z]{2,3}(\.[A-Za-z]{2})?)$/g;
    if (!patrn.exec(s)) return false
    return true
}
 
//
function enc(s)
{
    return $.md5(s+($('#date').val())+s.substr(1, 3))
}

function getCookie(name) {
    var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
    return r ? r[1] : undefined;
}

jQuery.postJSON = function(url, args, callback,fail) {
    args._xsrf = getCookie("_xsrf");
    $.ajax({url: url,timeout:1000, data: $.param(args), dataType: "json", type: "POST",
        success: function(response) {
            callback(response);
        },
        error : function(){fail();}
    });
};/**
 * Created by 95 on 2016/3/7.
 */

var Debug = true;

var Engine = 
{

    init : function()
    {
        //
        Notif.init();

        //
        Engine.signinCheck();

    },

    signinCheck : function()
    {
        var data = 
        {
            session:document.session,
            action:'signin',
        };
        jQuery.postJSON("./",data,Engine.onSigninBack,Engine.onSignError)
    },

    onSigninBack : function(data)
    {
        var sta = parseInt(data.sta);
        if(sta!=0)
        {
            if(sta == -1){
                alert("用户不存在，请重新登录！")
                window.location.href = "/login";
            }else if(sta == -2){
                alert("在别处登录了，请重新登录！")
                window.location.href = "/login";
            }
            else{
                alert("发生未知错误，请重新登录！")
                window.location.href = "/login";
            }
        }
        else
        {
            //登录成功
        }
    },

    onSignError : function(data)
    {

    },

/*
    update : function()
    {
        //Notif.print("send!");
        var ajax = jQuery.ajax
        ({
            url:"./",
            type:'POST',
            dataType:'json',
            timeout:1000,
            data:
            {
                session:document.session,
                action:'text'
            },
            success:function(data,status,xhr){
                //Notif.print("success!");
                text01.text(data['data']);
                setTimeout(Engine.update,1000);
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
                //Notif.print("error!");
                Notif.print("XMLHttpRequest.status="+XMLHttpRequest.status);
                Notif.print("XMLHttpRequest.readyState="+XMLHttpRequest.readyState);
                Notif.print("XMLHttpRequest.responseText="+XMLHttpRequest.responseText);
                Notif.print("XMLHttpRequest.statusText="+XMLHttpRequest.statusText);
                Notif.print("XtextStatus="+textStatus);
                setTimeout(Engine.update,1000);
                Engine.closeAjax(ajax);
            },
            complete: function(XMLHttpRequest, textStatus) {
                // 调用本次AJAX请求时传递的options参数
                //Notif.print("complete!");
                //setTimeout(Engine.update,1000);
            }
        });
    },*/
};

$(
    function()
    {
        Engine.init();
    }
);