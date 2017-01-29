/**
 * Created by 95 on 2016/3/7.
 */


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
};

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
            Login.clearError("#signinerror")
        })
        $('#username').focus(function(){
            Login.delError('#usernamewrapper');
            $('#username').val("");
            Login.clearError("#signinerror")
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

    onSignError : function()
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
            return;
        }
        
        if(bNameValid&&bPwdValid&&bIsSame)
        {
            Login.ing = true;
            data = 
                {
                    session:document.session,
                    action:'signup',
                    name:uname,
                    pwd:spwd,
                },
            jQuery.postJSON("./login",data,Login.onSignupBack,Login.onSignError)           
        }
    },

    onSignupBack : function(data)
    {
        Login.ing = false;
        var sta = parseInt(data.sta);
        if(sta!=0)
        {
            if(sta == -3){
                Login.printError("#signuperror","用户名或密码为空,请重新输入!")
            }else if(sta == -4){
                Login.printError("#signuperror","用户名已被占用，请换个名字")
            }else if(sta == -99){
                Login.printError("#signuperror","服务器忙")
            }else {
                Login.printError("#signuperror","发生未知错误")
            }
        }
        else
        {
            alert("注册成功，请登录！")
            window.location.href = "/login";
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
            return;
        }

        if(bNameValid&&bPwdValid)
        {
            Login.ing = true;
            data = 
                {
                    session:document.session,
                    action:'signin',
                    name:uname,
                    pwd:spwd,
                },
            jQuery.postJSON("./login",data,Login.onSigninBack,Login.onSignError)
        }
    },

    onSignError : function()
    {
        Login.ing = false;
        alert('error')
    },

    onSigninBack : function(data)
    {
        Login.ing = false;
        var sta = parseInt(data.sta);
        if(sta!=0)
        {
            if(sta == -2){
                Login.printError("#signinerror","无此用户，请先注册！")
            }else if(sta == -3){
                Login.printError("#signinerror","用户名或密码为空,请重新输入!")
            }else if(sta == -5){
                Login.printError("#signinerror","用户名或密码不正确！")
            }else {
                Login.printError("#signinerror","发生未知错误")
            }
        }
        else
        {
            window.location.href = "/";
        }
    },
};

$(
    function()
    {
        Login.createUI('div#box');
    }
);
//Engine.update();
