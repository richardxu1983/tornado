/**
 * Created by 95 on 2016/3/7.
 */

var Login = {

    title : null,

    loginui : null,

    ing : false,

    pwd : null,

    createUI : function(parent)
    {
        title = $('<div>').addClass('title').html("冒险者大陆").appendTo(parent);

        loginui = $('<div>').addClass('center-block').addClass('col-xs-6').addClass('col-md-4').attr('id', 'logindiv').appendTo(parent);
        $('<div>').attr('id', 'form_signin').appendTo('#logindiv');
        var inst_html = "";
        inst_html = "<div class='signTitle'><a id='nav_signup'>注册</a><a id='nav_signin'>登录</a></div>";
        inst_html+="<div id='singnwrapper'><div class='input-wrapper' id='usernamewrapper'>"
        inst_html+="<input type='text' id='username' class='form-control' placeholder='用户名' required autofocus></div> "
        inst_html+="<div class='input-wrapper' id='pwdwrapper'>"
        inst_html+="<input type='password' id='inputPassword' class='form-control' placeholder='密码' required></div>"
        inst_html+="<button class='btn btn-lg btn-primary btn-block' id='signinBtn' >登录</button><div class='errormsg' id='signinerror'></div></div>"
        inst_html+="<div id='regwrapper'><div class='input-wrapper' id='susernamewrapper'>"
        inst_html+="<input type='text' id='susername' class='form-control' placeholder='用户名' required autofocus></div> "
        inst_html+="<div class='input-wrapper' id='spwdwrapper'>"
        inst_html+="<input type='password' id='sinputPassword' class='form-control' placeholder='密码' required></div>"
        inst_html+="<div class='input-wrapper' id='srpwdwrapper'><input type='password' id='repeatPassword' class='form-control' placeholder='重复密码' required></div>"
        inst_html+="<button class='btn btn-lg btn-primary btn-block' id='signupBtn' >注册</button><div class='errormsg' id='signuperror'></div></div>"
        $('#form_signin').html(inst_html);

        $('#signinBtn').click(Login.onClickSignin)
        $('#signupBtn').click(Login.onClickSignup)
        $('#nav_signup').click(Login.onClickSignupNav)
        $('#nav_signin').click(Login.onClickSigninNav)
        $('#inputPassword').focus(function(){
            Login.delError('#pwdwrapper');
            $('#inputPassword').val("");
        })
        $('#username').focus(function(){
            Login.delError('#usernamewrapper');
            $('#username').val("");
        })
        $('#susername').focus(function(){
            Login.delError('#susernamewrapper');
            $('#susername').val("");
        })
        $('#sinputPassword').focus(function(){
            Login.delError('#spwdwrapper');
            $('#sinputPassword').val("");
        })
        $('#repeatPassword').focus(function(){
            Login.delError('#srpwdwrapper');
            $('#repeatPassword').val("");
        })
        Login.onClickSigninNav();
    },

    onClickSignupNav : function()
    {
        $('#singnwrapper').hide();
        $('#regwrapper').show();
        $('#nav_signup').addClass('active');
        $('#nav_signin').removeClass("active")
    },

    onClickSigninNav : function()
    {
        $('#regwrapper').hide();
        $('#singnwrapper').show();
        $('#nav_signin').addClass('active');
        $('#nav_signup').removeClass("active")
    },

    removeUI : function()
    {
        loginui.remove();
        title.remove();
    },

    printError : function(parent,msg)
    {
        $(parent).html(msg);
    },

    clearError : function(parent)
    {
        $(parent).html("");
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
        Login.printError("用户名密码不正确");
    },

    delError : function(parent)
    {
        $(parent+'>label.error').remove();
        Login.clearError();
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

    onClickSignup : function()
    {
        if(Login.ing)
            return;

        var uname = $('#susername').val();
        var spwd = $('#sinputPassword').val();
        var srpwd = $('#repeatPassword').val();

        var bNameValid = checkIsRegisterUserName(uname);
        var bPwdValid = checkIsPasswd(spwd);
        var bIsSame = (spwd==srpwd);

        if(!bNameValid)
        {
            Login.addError('#susernamewrapper','用户名为4-20位英文数字');
        }

        if(!bPwdValid)
        {
            Login.addError('#spwdwrapper','密码为6-20位英文数字');
        }

        if(!bIsSame)
        {
            Login.addError('#srpwdwrapper','2次密码不一致');
        }

        spwd = enc(spwd);
        if(spwd==undefined)
        {
            Notif.print("密码出现undefined错误")
        }
        
        if(bNameValid&&bPwdValid&&bIsSame)
        {
            ing = true;
            jQuery.ajax
            ({
                url:"./",
                type:'POST',
                dataType:'json',
                timeout:1000,
                data:
                {
                    session:document.session,
                    action:'signup',
                    name:uname,
                    pwd:spwd,
                },
                beforeSend:function(){  
                    $('#signinBtn').text('注册中...')
                },
                success:function(data,status,xhr){
                    //Notif.print("success!"); 
                    ing = false;
                },
                error:function(XMLHttpRequest, textStatus, errorThrown){
                    ing = false;
                },
                complete: function(XMLHttpRequest, textStatus) {
                    $('#signinBtn').text('注册')
                    ing = false;
                }
            });            
        }
    },

    onClickSignin : function()
    {

        if(Login.ing)
            return;

        var uname = $('#username').val();
        var spwd = $('#inputPassword').val();

        var bNameValid = checkIsRegisterUserName(uname);
        var bPwdValid = checkIsPasswd(spwd);

        if(!bNameValid)
        {
            Login.addError('#usernamewrapper','用户名为4-20位英文数字');
        }

          if(!bPwdValid)
        {
            Login.addError('#pwdwrapper','密码为6-20位英文数字');
        }      

        spwd = enc(spwd);
        if(spwd==undefined)
        {
            Notif.print("密码出现undefined错误")
        }

        if(bNameValid&&bPwdValid)
        {
            ing = true;
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
                    name:uname,
                    pwd:spwd,
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
        }
    },
};

