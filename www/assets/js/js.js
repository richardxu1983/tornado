/**
 * Created by 95 on 2016/3/7.
 */

var text=new Array();
text[0]="系 统"
text[1]="返 回"
text[2]="退出登录"
text[3]="年"
text[4]="春天"
text[5]="夏天"
text[6]="秋天"
text[8]="冬天"
text[9]="周"
text[10]="天"
text[11]="上午"
text[12]="晚上"
text[13]="天黑了..."
text[14]="天亮了，新的一天到来了..."
text[15]="背包"
text[16]="装备"
text[17]="双手"
text[18]="零"
text[19]="点"
text[20]="午夜"
text[21]="凌晨"
text[22]="正午"
text[23]="下午"
text[24]="当前用户"
text[25]="通用"
text[26]="新闻"
text[27]="用户不存在，请重新登录！"
text[28]="在别处登录了，请重新登录！"
text[29]="发生未知错误，请重新登录！"
text[30]="生命"
text[31]="饱食"
text[32]="抗寒"
text[33]="攻击"
text[34]="防御"
text[35]="金币"
text[36]="重置"
text[37]="自己的"
text[38]="家"
text[39]="森林"
text[40]="查看"
text[41]="建造"
text[42]="升级"
text[43]="采集"
text[44]="打猎"
text[45]="购买"
text[46]="挖掘"

var placeType=new Array();
placeType[0]=38;
placeType[1]=39;

var funText = new Array();
funText["view"] = 40;
funText["build"] = 41;
funText["expand"] = 42;
funText["gather"] = 43;
funText["hunt"] = 44;
funText["buy"] = 45;
funText["dig"] = 46;



function getString(id) {return text[id];}
function placeGetTitle(type){return getString(placeType[type])}
function funGetText(str){return getString(funText[str])}/**
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
    $.ajax({url: url,timeout:10000, data: $.param(args), dataType: "json", type: "POST",
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
}var GameMenu = {

    panel : null,
    mask : null,
    btn:null,

    init : function(options)
    {
        this.mask = $('<div>').addClass('maskOuter').appendTo(".container-fluid");
        this.panel = $('<div>').addClass('menup').appendTo(".maskOuter");
        setHorizontalCenter(this.panel,$("#box"));
        this.panel.css('top','220px');

        var el = $("<div>").css("position","absolute").css("top","18px").text(getString(24)+" : "+Engine.user+"("+Engine.nickname+")").appendTo(this.panel)
        setHorizontalCenter(el,this.panel)

        var signoutBtn = CreateBtn({
            text:getString(2),
            click:GameMenu.onClickSignout,
            id:"signoutBtn",
            center:true,
        },this.panel)

        signoutBtn.css("top","30%")

        var resetBtn = CreateBtn({
            text:getString(36),
            click:dbug.sendResetAttr,
            id:"resetBtn",
            center:true,
        },this.panel)

        resetBtn.css("top","45%")

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

var dbug =
{
    sendResetAttr:function()
    {
        var data =
        {
            session:document.session,
            action:'resetAttr',
        };
        jQuery.postJSON("./debug",data,dbug.resetAttrBack,Engine.onUpdateError)
    },

    resetAttrBack:function(data)
    {
        Role.AttrInit(data.attr)
    },
}/**
 * Created by 95 on 2016/3/7.
 */

var Bag = {

    ui : null,
    cells : null,
    desc : null,
    title_txt : getString(15)+" [ 0/16 ]",

    init : function(options)
    {
        Bag.ui = $('<div>').addClass('bagwrap').attr('id','BagPanel').appendTo("#box");
        $('<div>').addClass('titlewrap').text(Bag.title_txt).appendTo(Bag.ui);
        Bag.cells = $('<div>').addClass('bagcells').appendTo('.bagwrap');
        $('<div>').addClass('descwrap').attr('id','Bagdewr').appendTo('.bagwrap');
        Bag.desc = $('<div>').addClass('bagdesc').appendTo('#Bagdewr');
        Bag.hide()
    },

    hide : function()
    {
        Bag.ui.hide()
    },

    show : function()
    {
        Bag.ui.show()
    },
}

var Weapon = {

    ui : null,
    cells : null,
    desc : null,
    title_txt : getString(17),

    init : function(options)
    {
        Weapon.ui = $('<div>').addClass('bagwrap').attr('id','WeaponPanel').appendTo("#box");
        $('<div>').addClass('titlewrap').text(Weapon.title_txt).appendTo(Weapon.ui);
        Weapon.cells = $('<div>').addClass('bagcells').appendTo('#WeaponPanel');
        $('<div>').addClass('descwrap').attr('id','Weapondewr').appendTo('#WeaponPanel');
        Weapon.desc = $('<div>').addClass('bagdesc').appendTo('#Weapondewr');
        Weapon.hide()
    },

    hide : function()
    {
        Weapon.ui.hide()
    },

    show : function()
    {
        Weapon.ui.show()
    },
}

var Equip = {

    ui : null,
    cells : null,
    desc : null,
    title_txt : getString(16),

    init : function(options)
    {
        Equip.ui = $('<div>').addClass('bagwrap').attr('id','EquipPanel').appendTo("#box");
        $('<div>').addClass('titlewrap').text(Equip.title_txt).appendTo(Equip.ui);
        Equip.cells = $('<div>').addClass('bagcells').appendTo('#EquipPanel');
        $('<div>').addClass('descwrap').attr('id','Equipdewr').appendTo('#EquipPanel');
        Equip.desc = $('<div>').addClass('bagdesc').appendTo('#Equipdewr');
        Equip.hide()
    },

    hide : function()
    {
        Equip.ui.hide()
    },

    show : function()
    {
        Equip.ui.show()
    },
}/**
 * Created by 95 on 2016/3/7.
 */

var StatusView = {

    ui : null,

    init : function(options)
    {
        StatusView.ui = $('<div>').addClass('statusBar').appendTo("#box");
    },
}/**
 * Created by 95 on 2016/3/7.
 */

var Role = {

	mapAreaId:0,
	status:0,
	gold:0,
	atFunction:"",
	mapArea:{
		x:0,
		y:0,
	},
	block:{
		x:0,
		y:0,
	},
	attr:{
		hp:0,
		fed:0,
		coldResist:0,
		atk:0,
		def:0,
	},

	mapAreaSet:function(x,y)
	{
		Role.mapArea.x = x
		Role.mapArea.y = y
	},

	blockSet:function(x,y)
	{
		Role.block.x = x
		Role.block.y = y
	},

	AttrSet:function(key,value)
	{
		Role.attr[key]=value
		AttrView.AttrSet(key,value)
	},

	GoldSet:function(value)
	{
		Role.gold = value
		Role.AttrSet("gold",value)
	},

	AttrGet:function(key)
	{
		return Role.attr[key]
	},

	AttrInit(data)
	{
		for (key in data){
			Role.AttrSet(key,data[key])
		}
	}
} 

var AttrView = {

    ui : null,

    hp : {
    	wrap : null,
    	value:null,
    	text:30,
    	danger:25,
    },

    fed : {
    	wrap : null,
    	value:null,
    	text:31,
    	danger:25,
    },

    coldResist:{
    	wrap : null,
    	value:null,   	
    	text:32,
    },

    atk:{
    	wrap : null,
    	value:null,   
    	text:33,	
    },

    def:{
    	wrap : null,
    	value:null,  
    	text:34,	
    }, 
    gold:{
    	wrap : null,
    	value:null,   
    	text:35,	
    },

    initAttrUI:function(attr,left,top)
    {
    	AttrView[attr].wrap = $('<div>').addClass('attrwrap').attr("id",attr+"wrap").css("left",left+"px").css("top",top+"px").appendTo(AttrView.ui);
    	$('<div>').attr("id",attr+"label")
    	.addClass("attrlabel")
    	.text(getString(AttrView[attr].text)+" :")
    	.appendTo(AttrView[attr].wrap);
    	AttrView[attr].value = $('<div>').attr("id",attr+"value")
    	.addClass("attrvalue")
    	.text("0")
    	.appendTo(AttrView[attr].wrap);
    },

    initPropUI:function(attr,left,top)
    {
    	AttrView[attr].wrap = $('<div>').addClass('propwrap').attr("id",attr+"wrap").css("right",left+"px").css("top",top+"px").appendTo(AttrView.ui);
    	$('<div>').attr("id",attr+"label")
    	.addClass("proplabel")
    	.text(getString(AttrView[attr].text)+" :")
    	.appendTo(AttrView[attr].wrap);
    	AttrView[attr].value = $('<div>').attr("id",attr+"value")
    	.addClass("attrvalue")
    	.text("0")
    	.appendTo(AttrView[attr].wrap);
    },

    AttrSet:function(attr,value)
    {
    	AttrView[attr].value.text(value);
    	if(AttrView[attr].danger!=undefined)
    	{
    		if(value<=AttrView[attr].danger)
    		{
    			AttrView[attr].value.addClass("danger")
    		}
    		else
    		{
    			if(AttrView[attr].value.hasClass("danger"))
    			{
    				AttrView[attr].value.removeClass("danger")
    			}
    		}
    	}
    },

    init : function(options)
    {
        AttrView.ui = $('<div>').addClass('attrBar').appendTo("#box");
        AttrView.initAttrUI("hp",7,7);
        AttrView.initAttrUI("fed",7,35);
        AttrView.initAttrUI("atk",112,7);
        AttrView.initAttrUI("def",112,35);
        AttrView.initAttrUI("coldResist",217,7);
        AttrView.initPropUI("gold",5,7);
        
    },
}/**
 * Created by 95 on 2016/3/7.
 */

var Place = {

    x : null,
    y : null,
    belong : null,
    belongTo : null,
    self : 0,
    type:-1,
    pos_ui:null,

    init : function()
    {
        Place.pos_ui = $('<div>').addClass('wrd').text("").css("right","18px").appendTo(".topBar");
    },

    setPos:function(data)
    {
        Place.x = parseInt(data.x)
        Place.y = parseInt(data.y)
        Place.belong = parseInt(data.belong)
        Place.belongTo = data.belongTo
        Place.self = parseInt(data.self)
        Place.type = parseInt(data.type)
        Place.refreshTopTxt()
    },
    
    refreshTopTxt:function()
    {
        var txt="[ "+Place.x+","+Place.y+" ]"
        txt+=" - "
        if(Place.belong!=0)
        {
            if(Place.self==1)
            {
                txt+=getString(37)
            }
            else
            {
                txt+=Place.belongTo
            }
        }
        txt+=placeGetTitle(Place.type)
        Place.pos_ui.text(txt)
    },
}

var Env = {

    time_ui : null,
    pos_ui : null,
    time_txt : "1001年 , 第1天 , 白天 [ 春天 - 晴朗 ]",
    pos_txt : "奥丁城郊外 [12,35] - 自己的家",
    year:null,
    season : null,
    week : null,
    day : 0,
    hour : 0,
    last_hour : 0,
    season_txt : null,
    day_txt:null,

    init : function(options)
    {
        Env.time_ui = $('<div>').addClass('wrd').css("left","8px").appendTo(".topBar");
        Env.time_ui.text(Env.time_txt);
    },

    setTime : function(year,season,week,day,hour)
    {
        Env.year = year
        Env.season = season
        Env.week = week
        Env.day = day
        Env.hour = hour
        Env.season_txt = getString(3 + Env.season)
        if((hour>=7&&hour<=10))
        {
            Env.day_txt = getString(11)
        }
        else if(hour>=15&&hour<=18)
        {
            Env.day_txt = getString(23)
        }
        else if((hour>=11&&hour<=14))
        {
            Env.day_txt = getString(22)
        }
        else if(hour>=19&&hour<=24)
        {
            Env.day_txt = getString(12)
        }
        else if(hour>=0&&hour<=4)
        {
            Env.day_txt = getString(20)
        }
        else if(hour>=5&&hour<=6)
        {
            Env.day_txt = getString(21)
        }
        if(Env.hour==19&&Env.last_hour==18)
        {
            printMsg(getString(13),1)
        }
        if(Env.hour==7&&Env.last_hour==6)
        {
            printMsg(getString(14),1)
        }
        
        Env.last_hour = Env.hour
        Env.setTimeTxt()
    },

    setTimeTxt : function()
    {
        Env.time_txt = Env.year+getString(3)+Env.season_txt+" , "+Env.week+getString(9)+getString(18)+Env.day+getString(10)+ " , "+Env.hour+"h : "+Env.day_txt
        Env.time_ui.text(Env.time_txt);
    },
}/**
 * Created by 95 on 2016/3/7.
 */

var GB = {

    title_ui : null,
    fun_ui : null,
    op_ui : null,

    init:function()
    {
        GB.title_ui = $('<div>').addClass('gtitle').appendTo(".gboard");
        GB.fun_ui = $('<div>').addClass('gfun').appendTo(".gboard");
        GB.op_ui = $('<div>').addClass('gop').appendTo(".gboard");
    },

    refreshUI:function()
    {
        GB.refreshTitle();
    },

    refreshTitle:function()
    {
        txt="";
        if(Place.belong!==0)
        {
            if(Place.self==1)
            {
                txt+=getString(37);
            }
            else
            {
                txt+=Place.belongTo;
            }
        }
        txt+=placeGetTitle(Place.type);
        GB.title_ui.text(txt);
    },
}/**
 * Created by 95 on 2016/3/7.
 */
var _jData = new Array();
var getList = ["build","expand","Facilities","Place"]
var lastIndex;

var Engine =
{
    nickname : null,
    user : null,

    init : function()
    {
        Engine.signinCheck();
    },

    signinCheck : function()
    {
        var data =
        {
            session:document.session,
            action:'signin',
        };
        jQuery.postJSON("./",data,Engine.onSigninBack,Engine.onSignError);
    },

    onSigninBack : function(data)
    {
        var sta = parseInt(data.sta);
        if(sta!==0)
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
            Engine.data = data;
            Engine.jsonLoad()
        }
    },

    jsonLoad:function(data1)
    {
        lastIndex = getList.shift();
        $.ajax({
        url: "static/json/"+lastIndex+".json?random="+Math.random(),
        type: "GET",
        success: function(data){
            _jData[lastIndex] = JSON.parse(data)
            if(getList.length > 0){
                    setTimeout(Engine.jsonLoad, 100);
                }
                else{
                    alert(_jData["Place"][1]["type"])
                    Engine.initBarUI('topBar');
                    Engine.initBarUI('bottombar');
                    Engine.initBarUI('rlink');
                    Engine.initBarUI('gboard');
                    Engine.initBarUI('blink');
                    Engine.ModuleInit(Engine.data);
                    CreateRightBtn();
                    Engine.onClickBagBtn();
                    SwitchCh1();
                    Role.AttrInit(Engine.data.attr);
                    Role.GoldSet(Engine.data.gold);
                    Place.setPos(Engine.data.pos);
                    GB.refreshUI();
                    Engine.update();
                }
        },
        });
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
        Place.init()
        StatusView.init();
        AttrView.init();
        Bag.init();
        Weapon.init();
        Equip.init();
        GameMenu.init()
        GB.init()
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
        };
        jQuery.postJSON("./update",data,Engine.onUpdateBack,Engine.onUpdateError)
    },
    onUpdateError:function()
    {
        alert(getString(29))
        window.location.href = "/login";
    },
    onUpdateBack:function(data)
    {
        var sta = parseInt(data.sta);
        if(sta!==0)
        {

        }
        else
        {
            Env.setTime(data.year,data.season,data.week,data.day,data.hour);
            Role.AttrInit(data.attr);
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
    ui.addClass("btn_link_sel");
}

function RemoveTinySel(ui)
{
    ui.removeClass("btn_link_sel");
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