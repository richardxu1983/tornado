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

