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

/**
 * Created by 95 on 2016/3/7.
 */

var Login = {

    ui : null,

    ing : false,

    pwd : null,

    createUI : function(parent)
    {
        ui = $('<div>').addClass('center-block').addClass('col-xs-6').addClass('col-md-4').attr('id', 'logindiv').appendTo(parent);
        $('<div>').attr('id', 'form_signin').appendTo('#logindiv');
        var inst_html = "";
        inst_html = "<div class='signTitle'>请登录</div>";
        inst_html+="<div class='input-wrapper' id='usernamewrapper'>"
        inst_html+="<input type='text' id='username' class='form-control' placeholder='用户名' required autofocus></div> "
        inst_html+="<div class='input-wrapper' id='pwdwrapper'>"
        inst_html+="<input type='password' id='inputPassword' class='form-control' placeholder='密码' required></div>"
        inst_html+="<button class='btn btn-lg btn-primary btn-block' id='signinBtn' >登录</button> "
        $('#form_signin').html(inst_html);

        $('#signinBtn').click(Login.onClickSignin)
    },

    addError : function(parent,msg)
    {
        if($(parent+'>label.error').length==0)
        {
            $('<label>').addClass('error').html(msg).appendTo(parent)
        }
        else
        {
            $(parent+'>label.error').html(msg);
        }
    },

    delError : function(parent)
    {
        $(parent+'>label.error').remove();
    },

    nameCheck : function(str)
    {

    },

    pwdCheck : function(str)
    {

    },

    pwdProc : function()
    {

    },

    onClickSignin : function()
    {

        if(Login.ing)
            return;

        ing = true;

        Login.addError('#usernamewrapper','error');
        Login.addError('#usernamewrapper','error1');
        //Login.delError('#usernamewrapper');

        jQuery.ajax
        ({
            url:"./",
            type:'POST',
            dataType:'json',
            timeout:1000,
            data:
            {
                session:document.session,
                action:'signin',
                name:$('#username').val(),
                pwd:$('#inputPassword').val()
            },
            beforeSend:function(){  
                $('#signinBtn').text('登录中...')
            },
            success:function(data,status,xhr){
                //Notif.print("success!"); 
                ing = false;
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
                ing = false;
            },
            complete: function(XMLHttpRequest, textStatus) {
                $('#signinBtn').text('登录')
                ing = false;
            }
        });
    },
};

/**
 * Created by 95 on 2016/3/7.
 */

var Debug = true;

var Engine = 
{
    btn : null,
    text01: null,
    loginui: null,

    init : function()
    {
        //
        Notif.init();

        text01 = $('<div>').addClass('text').attr('id', 'text').appendTo('div#area');

        //session
        document.session = $("#session").val();

        //Engine.update();
        Login.createUI('div#box');
    },

    closeAjax : function(ajax)
    {
        ajax.abort();
    },

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
    },
};

$(
    function()
    {
        Engine.init();
    }
);