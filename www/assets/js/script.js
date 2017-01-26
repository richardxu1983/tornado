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