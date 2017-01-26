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
        this.ShowloginUI()
    },

    closeAjax : function(ajax)
    {
        ajax.abort();
    },

    ShowloginUI : function()
    {
        this.loginui = $('<div>').addClass('center-block').addClass('col-xs-6').addClass('col-md-4').attr('id', 'logindiv').appendTo("div#box");
        $('<div>').attr('id', 'form_signin').appendTo('#logindiv');
        var inst_html = "";
        inst_html = "<h2 class='form-signin-heading'>请登录</h2>";
        inst_html+="<label for='username' class='sr-only'>用户名</label>"
        inst_html+="<input type='text' id='username' class='form-control' placeholder='用户名' required autofocus> "
        inst_html+="<label for='inputPassword' class='sr-only'>密码</label>"
        inst_html+="<input type='password' id='inputPassword' class='form-control' placeholder='密码' required>"
        inst_html+="<button class='btn btn-lg btn-primary btn-block' id='signinBtn' >登录</button> "
        $('#form_signin').html(inst_html);

        $('#signinBtn').click(function()
        {
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
                },
                error:function(XMLHttpRequest, textStatus, errorThrown){
                },
                complete: function(XMLHttpRequest, textStatus) {
                    $('#signinBtn').text('登录')  
                }
            });
        })
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