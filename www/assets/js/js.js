/**
 * Created by 95 on 2016/3/7.
 */

var text=new Array();
text[0]="系 统"
text[1]="返 回"
text[2]="退出登录"

function getString(id) {
    // body...
    return text[id];
}/**
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

var GameInfo = {

    init : function(options)
    {
        var elem = $('<div>').addClass('gi').appendTo("#box");
        $('<div>').attr('id','notifyGradient').appendTo(elem);
    },

    print : function(text){

        if(typeof text == 'undefined') return;
        //if(text.slice(-1) != ".") text += ".";
        GameInfo.tp(text);
    },

    clearHidden : function(){
        var bottom = $('div.gi').position().top + $('div.gi').outerHeight(true);
        $('div.gi>.devInfoTxt').each(function () {
            if($(this).position().top > bottom){
                $(this).remove();
            }
        })
    },

    tp : function(t)
    {
        var text = $('<div>').addClass('devInfoTxt').text(t).prependTo('div.gi');
        GameInfo.clearHidden();
        text.animate({opacity:1} , 500 , 'linear' , function(){
            GameInfo.clearHidden();
        });
    },
}

function setHorizontalCenter(ui,parent)
{
    var total = parent.width()
    var left = (total - ui.width())/2
    ui.css('left',left+'px');
}


var GameMenu = {

    panel : null,

    mask : null,

    btn:null,

    init : function(options)
    {
        this.mask = $('<div>').addClass('maskOuter').appendTo(".container-fluid");
        this.panel = $('<div>').addClass('menup').appendTo(".maskOuter");
        setHorizontalCenter(this.panel,$("#box"));
        this.panel.css('top','220px');

        var signoutBtn = CreateBtn({
            text:getString(2),
            click:GameMenu.onClickSignout,
            id:"signoutBtn",
            center:true,
        },this.panel)

        signoutBtn.css("top","30%")

        var backBtn = CreateBtn({
            text:getString(1),
            click:GameMenu.hideMenu,
            id:"menuback",
            center:true,
        },this.panel)

        backBtn.css("position","absolute")
        backBtn.css("bottom","18px")

        this.hideMenu();

        this.btn = CreateBtn({
            text:getString(0),
            click:GameMenu.showMenu,
            id:"menu",
        },$(".bottombar"))
        this.btn.css("float","right")
        this.btn.css("margin-right","5px")
    },

    onClickSignout : function()
    {
        window.location.href = "/logout";
    },

    showMenu : function()
    {
        GameMenu.mask.show();
    },

    hideMenu : function()
    {
        GameMenu.mask.hide();
    },
}

function CreateBtn(options,parent)
{
    var el = $('<div>')
    .attr('id',options.id)
    .addClass('btn_normal')
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

//获取文字宽度
function getTextWidth(text)
{
    var ruler = $("#ruler"); 
    ruler.text(text); 
    return ruler.width(); 
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

var Bag = {

    ui : null,

    cells : null,

    desc : null,

    title_txt : "背包 [ 0/16 ]",

    init : function(options)
    {
        ui = $('<div>').addClass('bagwrap').appendTo("#box");
        $('<div>').addClass('titlewrap').text(Bag.title_txt).appendTo('.bagwrap');
        cells = $('<div>').addClass('bagcells').appendTo('.bagwrap');
        $('<div>').addClass('descwrap').appendTo('.bagwrap');
        desc = $('<div>').addClass('bagdesc').appendTo('.descwrap');
    },
}/**
 * Created by 95 on 2016/3/7.
 */

var Env = {

    time_ui : null,

    pos_ui : null,

    time_txt : "1001年 , 第1天 , 白天 [ 春天 - 晴朗 ]",

    pos_txt : "奥丁城郊外 [12,35] - 自己的家",

    day : 0,

    hour : 0,

    init : function(options)
    {
        time_ui = $('<div>').addClass('wrd').text(Env.time_txt).css("left","8px").appendTo(".topBar");
        pos_ui = $('<div>').addClass('wrd').text(Env.pos_txt).css("right","18px").appendTo(".topBar");
    },

    setTimeTxt : function(str)
    {
        Env.time_ui.text(str);
    },

    setPosTxt : function(str)
    {
        Env.pos_ui.text(str);
    },
}/**
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
            //
            $('<div>').addClass('topBar').appendTo("#box");
            $('<div>').addClass('bottombar').appendTo("#box");
            
            //登录成功
            GameInfo.init();

            //
            Env.init();

            //
            Bag.init();

            GameMenu.init()
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