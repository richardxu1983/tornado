/**
 * Created by 95 on 2016/3/7.
 */

var Debug = true;

var Engine = 
{
    nickname : null,
    user : null,

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
            Engine.nickname = data.nickname;
            Engine.user = data.user;

            //
            $('<div>').addClass('topBar').appendTo("#box");
            $('<div>').addClass('bottombar').appendTo("#box");
            
            //登录成功
            GameInfo.init();
            Env.init();
            Env.setTime(data.year,data.season,data.week,data.day,data.hour)

            Bag.init();
            GameMenu.init()
            Engine.update()
        }
    },

    onSignError : function(data)
    {
        alert("发生未知错误，请重新登录！")
        window.location.href = "/login";
    },

    update :function()
    {
        var data = 
        {
            session:document.session,
            action:'update',
        };
        jQuery.postJSON("./",data,Engine.onUpdateBack,Engine.onUpdateError)
    },

    onUpdateBack:function(data)
    {
        var sta = parseInt(data.sta);
        if(sta!=0)
        {

        }
        else
        {
            Env.setTime(data.year,data.season,data.week,data.day,data.hour)
            setTimeout(Engine.update,1000);
        }
    }

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