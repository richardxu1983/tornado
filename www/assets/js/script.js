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
        //Notif.init();

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
                alert(getString(27))
                window.location.href = "/login";
            }else if(sta == -2){
                alert(getString(28))
                window.location.href = "/login";
            }
            else{
                alert(getString(29))
                window.location.href = "/login";
            }
        }
        else
        {
            //登录成功
            Engine.nickname = data.nickname;
            Engine.user = data.user;

            Engine.initBarUI('topBar')
            Engine.initBarUI('bottombar')
            Engine.initBarUI('rlink')
            Engine.initBarUI('gboard')
            Engine.initBarUI('blink')

            Engine.ModuleInit(data)
            Engine.update()
            CreateRightBtn()
            Engine.onClickBagBtn()
            SwitchCh1()
            Role.AttrInit(data.attr)
            Role.GoldSet(data.gold)
            //Role.AttrSet("hp",5);
        }
    },

    initBarUI:function(bar)
    {
        $('<div>').addClass(bar).appendTo("#box");
    },

    ModuleInit :function(data)
    {
        Chn1.init();
        Chn2.init();
        Env.init();
        Env.setTime(data.year,data.season,data.week,data.day,data.hour)
        StatusView.init();
        AttrView.init();
        Bag.init();
        Weapon.init();
        Equip.init();
        GameMenu.init()
    },

    onClickBagBtn : function()
    {
        Bag.show();
        Weapon.hide();
        Equip.hide();
        AddTinySel($("#Bag_btn"))
        RemoveTinySel($("#Weapon_btn"))
        RemoveTinySel($("#Equip_btn"))

    },
    onClickWeaponBtn : function()
    {
        Bag.hide();
        Weapon.show();
        Equip.hide();
        AddTinySel($("#Weapon_btn"))
        RemoveTinySel($("#Bag_btn"))
        RemoveTinySel($("#Equip_btn"))

    },
    onClickEquipBtn : function()
    {
        Bag.hide();
        Weapon.hide();
        Equip.show();
        AddTinySel($("#Equip_btn"))
        RemoveTinySel($("#Bag_btn"))
        RemoveTinySel($("#Weapon_btn"))

    },

    onSignError : function(data)
    {
        alert(getString(29))
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

    sendRest:function()
    {
        var data = 
        {
            session:document.session,
            action:'resetAttr',
        };
        jQuery.postJSON("./",data,Engine.onsendRestBack,Engine.onUpdateError)        
    },

    onUpdateError:function()
    {
        alert(getString(29))
        window.location.href = "/login";
    },

    onsendRestBack:function(data)
    {
        Role.AttrInit(data.attr)
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
            Role.AttrInit(data.attr)
            setTimeout(Engine.update,1000);
        }
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

function AddTinySel(ui)
{
    ui.addClass("btn_link_sel")
}

function RemoveTinySel(ui)
{
    ui.removeClass("btn_link_sel")
}

function CreateRightBtn()
{
    var Bag_btn = CreateBtn({
        text:getString(15),
        click:Engine.onClickBagBtn,
        id:"Bag_btn",
        type:"link",
    },$(".rlink"))
    rbStyle(Bag_btn)

    var Weapon_btn = CreateBtn({
        text:getString(17),
        click:Engine.onClickWeaponBtn,
        id:"Weapon_btn",
        type:"link",
    },$(".rlink"))
    rbStyle(Weapon_btn)

    var Equip_btn = CreateBtn({
        text:getString(16),
        click:Engine.onClickEquipBtn,
        id:"Equip_btn",
        type:"link",
    },$(".rlink"))
    rbStyle(Equip_btn)

    var Chn1_btn = CreateBtn({
        text:getString(25),
        click:SwitchCh1,
        id:"Chn1_btn",
        type:"link",
    },$(".blink"))
    rbStyle(Chn1_btn)

    var Chn2_btn = CreateBtn({
        text:getString(26),
        click:SwitchCh2,
        id:"Chn2_btn",
        type:"link",
    },$(".blink"))
    rbStyle(Chn2_btn)
}

function rbStyle(ui)
{
    ui.css("float","left")
    ui.css("margin-right","5px")    
}

$(
    function()
    {
        Engine.init();
    }
);