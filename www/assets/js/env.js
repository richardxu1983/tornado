/**
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
    tiles:{},

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
}