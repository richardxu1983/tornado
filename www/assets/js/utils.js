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

var Chn1= {
    elem:null,
    init : function(options)
    {
        Chn1.elem = $('<div>').attr("id","Chn1").addClass('gi').appendTo("#box");
        $('<div>').attr("id",'notifyGradient').appendTo(Chn1.elem);
    },

    print : function(text){

        if(typeof text == 'undefined') return;
        //if(text.slice(-1) != ".") text += ".";
        Chn1.tp(text);
    },

    clearHidden : function(){
        var bottom = $('div.gi').position().top + $(Chn1.elem).outerHeight(true);
        $('div.gi>.devInfoTxt').each(function () {
            if($(this).position().top > bottom){
                $(this).remove();
            }
        })
    },

    tp : function(t)
    {
        var text = $('<div>').addClass('devInfoTxt').css('opacity', '0').text(t).prependTo(Chn1.elem);
        Chn1.clearHidden();
        text.animate({opacity:1} , 800 , 'linear' , function(){
            Chn1.clearHidden();
        });
    },

    hide:function()
    {
        Chn1.elem.hide()
    },
    show:function()
    {
        Chn1.elem.show()
    },
}

var Chn2 = {
    elem:null,
    init : function(options)
    {
        Chn2.elem = $('<div>').attr("id","Chn2").addClass('gi').appendTo("#box");
        $('<div>').attr("id",'notifyGradient').appendTo(Chn2.elem);
    },

    print : function(text){

        if(typeof text == 'undefined') return;
        //if(text.slice(-1) != ".") text += ".";
        Chn2.tp(text);
    },

    clearHidden : function(){
        var bottom = $('div.gi').position().top + $(Chn2.elem).outerHeight(true);
        $('div.gi>.devInfoTxt').each(function () {
            if($(this).position().top > bottom){
                $(this).remove();
            }
        })
    },

    tp : function(t)
    {
        var text = $('<div>').addClass('devInfoTxt').css('opacity', '0').text(t).prependTo(Chn2.elem);
        Chn2.clearHidden();
        text.animate({opacity:1} , 800 , 'linear' , function(){
            Chn2.clearHidden();
        });
    },
    hide:function()
    {
        Chn2.elem.hide()
    },
    show:function()
    {
        Chn2.elem.show()
    },
}

function printMsg(str,chl)
{
    if(chl==1)
    {
        Chn1.print(str)
    }
    else
    {
        Chn2.print(str)
    }
}

function SwitchCh1()
{
    Chn2.hide();
    Chn1.show();
    AddTinySel($("#Chn1_btn"))
    RemoveTinySel($("#Chn2_btn"))
}

function SwitchCh2()
{
    Chn1.hide();
    Chn2.show();
    AddTinySel($("#Chn2_btn"))
    RemoveTinySel($("#Chn1_btn"))
}


function setHorizontalCenter(ui,parent)
{
    var total = parent.width()
    var left = (total - ui.width())/2
    ui.css('left',left+'px');
}

function CreateBtn(options,parent)
{
    var el = $('<div>')
    .attr('id',options.id)
    if(options.type!=undefined)
    {
        el.addClass('btn_link')
    }
    else
    {
        el.addClass('btn_normal')
    }
    if(options.click!=undefined)
    {
         el.click(options.click)
    }
    if(parent!=undefined)
    {
        el.appendTo(parent)
    }
    var w = options.text.getTextW() + 20
    el.css("width",w+"px");
    el.text(options.text);
    if(options.center==true)
    {
         setHorizontalCenter(el,parent)
    }
    return el;
}

String.prototype.getTextW = function(style){//获取字符串宽度及高度
    var $span=$("<span>"+this+"</span>");
    $span.css($.extend({},style,{visibility:"hidden"}));
    $("body").append($span);
    var w=$span.width()
    $span.remove();
    return w;
};

//
function checkIshanzi(s) {
    //var patrn = /^[\u2E80-\u9FFF]$/; //Unicode编码中的汉字范围  /[^\x00-\x80]/
    var patrn = /[^\x00-\x80]/;
    if (!patrn.exec(s)) return false
    return true
}

//校验登录名：只能输入4-20个可带数字的字串
function checkIsRegisterUserName(s) {
    var patrn = /^([\u4e00-\u9fa5a-zA-Z0-9]){4,20}$/;
    if (!patrn.exec(s)) return false
    return true
}

//校验密码：只能输入6-20个字母、数字、下划线
function checkIsPasswd(s) {
    var patrn = /^[a-z0-9_-]{6,19}$/;
    if (!patrn.exec(s)) return false
    return true
}

//校验手机号码
function checkIsMobil(s) {
    var patrn = /^0?(13[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/;
    if (!patrn.exec(s)) return false
    return true
}

//校验EMail
function checkIsEMail(s) {
    var patrn = /^([0-9A-Za-z\-_\.]+)@([0-9A-Za-z]+\.[A-Za-z]{2,3}(\.[A-Za-z]{2})?)$/g;
    if (!patrn.exec(s)) return false
    return true
}

//
function checkIsNickName(s)
{
    var patrn = /^([\u4e00-\u9fa5a-zA-Z0-9]){3,8}$/;
    if (!patrn.exec(s)) return false
    return true
}

//
function enc(s)
{
    return $.md5(s+($('#date').val())+s.substr(1, 3))
}

//
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
};

function getQueryStr(val)
{
    var uri = window.location.search;
　　var re = new RegExp("" +val+ "=([^&?]*)", "ig");
　　return ((uri.match(re))?(uri.match(re)[0].substr(val.length+1)):null);
}